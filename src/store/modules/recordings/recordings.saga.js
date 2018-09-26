import * as TYPES from './recordings.types'
import moment from 'moment'
import axios from 'axios'
import { Recordings } from '../../api'
import { takeLatest, call, put, takeEvery, select } from 'redux-saga/effects'
import {
    SetActiveRecording,
    SetRecordingComments,
    AddComment,
    SetRecordings,
    SetTotalRecordings,
    GetRecordings,
    GetShareableLink,
    GetSignedUrl,
    SetShareableLink,
    CreateComment,
    DeleteRecording,
    LoadingRecordings,
    GetPublicSignedUrl
} from './recordings.actions'
import { SetTeammates } from '../teammates/teammates.actions'
import { RequestError } from '../shared/shared.actions'

export default [
    takeLatest(TYPES.GET_RECORDINGS, GetRecordingsSaga),
    takeLatest(TYPES.GET_SIGNED_URL, GetSignedUrlSaga),
    takeLatest(TYPES.GET_PUBLIC_SIGNED_URL, GetPublicSignedUrlSaga),
    takeLatest(TYPES.GET_SHAREABLE_LINK, GetShareableLinkSaga),
    takeLatest(TYPES.CREATE_COMMENT, CreateCommentSaga),
    takeLatest(TYPES.PLAY_RECORDING_ERROR, PlayRecordingErrorSaga),
    takeEvery(TYPES.DELETE_RECORDING, DeleteRecordingSaga)
]

function* GetRecordingsSaga ({ payload }) {
    yield put(LoadingRecordings(true))

    const res = yield call(Recordings.GetLimit, payload.offset, payload.limit)

    try {
        const { selected_recordings, all_recordings_count } = res.data

        selected_recordings.forEach(recording =>
            recording.meeting_started_at = moment(recording.meeting_started_at)
        )

        yield put(SetRecordings(selected_recordings))
        yield put(SetTotalRecordings(all_recordings_count))

        yield put(LoadingRecordings(false))
    } catch (ex) {
        yield put(
            RequestError(
                GetRecordings(payload.offset, payload.limit),
                'Failed to Load Recordings, Retrying... Check your internet. Try refreshing.',
                ex
            )
        )
    }
}

function* GetSignedUrlSaga ({ payload: recordingId }) {
    const res = yield call(Recordings.Get, recordingId)

    try {
        const { recording, team_members } = res.data
        const { recording_comments } = recording

        recording.meeting_started_at = moment(recording.meeting_started_at)

        for (let comment of recording_comments)
            comment.created_at = moment(comment.created_at)

        yield put(SetTeammates(team_members))
        yield put(SetRecordingComments(recording_comments))
        yield put(SetActiveRecording(recording))
    } catch (ex) {
        yield put(
            RequestError(
                GetSignedUrl(recordingId),
                'Failed to Get Recording, Retrying... Check your internet. Try refreshing.',
                ex
            )
        )
    }
}

function* GetPublicSignedUrlSaga ({ payload: { recordingId, authToken } }) {
    const res = yield call(Recordings.GetPublic, recordingId, authToken)

    if (res && res.status === 200) {
        const recording = res.data

        recording.meeting_started_at = moment(recording.meeting_started_at)

        yield put(SetActiveRecording(recording))
    } else {
        yield put(
            RequestError(
                GetPublicSignedUrl(recordingId, authToken),
                'Failed ot Get Recording, Retrying... Check your internet. Try refreshing.',
                new Error(JSON.stringify(res))
            )
        )
    }
}

function* GetShareableLinkSaga ({ payload, meta }) {
    const res = yield call(Recordings.GetLink, payload)

    try {
        const shareableLink = window.location.origin + res.data.url
        yield put(SetShareableLink(shareableLink))
    } catch (ex) {
        yield put(
            RequestError(
                GetShareableLink(payload, meta),
                'Failed to Get Shareable Link, Retrying... Check your internet. Try refreshing.',
                ex
            )
        )
    }

    meta.setSubmitting(false)
}

function* CreateCommentSaga ({ payload, meta }) {
    const res = yield call(Recordings.Comments.Create, payload)

    if (res && res.status === 201) {
        const comment = res.data
        comment.created_at = moment(comment.created_at)
        meta.resetForm()

        yield put(AddComment(comment))

        if (meta.props.replyToId)
            meta.props.cancelClick()

        if (meta.props.listRef) {
            const list = meta.props.listRef.current
            list.scrollTop = list.scrollHeight
        }
    } else {
        yield put(
            RequestError(
                CreateComment(payload, meta),
                'Failed to Create Comment, Retrying... Check your internet. Try refreshing.',
                new Error(JSON.stringify(res))
            )
        )
    }

    meta.setSubmitting(false)
}

function* DeleteRecordingSaga ({ payload, meta }) {
    const res = yield call(Recordings.Delete, payload)

    if (!res || res.status !== 204) {
        yield put(
            RequestError(
                DeleteRecording(payload, meta.callback),
                'Failed to Delete Comment, Retrying... Check your internet. Try Refreshing.',
                { message: `Invalid response code: ${ JSON.stringify(res) }` }
            )
        )
    }

    meta && meta.callback()
}

function* PlayRecordingErrorSaga ({ payload: error }) {
    if (window.toastr)
        window.toastr.error('Failed to load video. Please try refreshing. (Support Notified)', 'Failed to Load')

    const errorData = error && error._targetInst && error._targetInst.memoizedProps

    const errorLogModel = {
        message: JSON.stringify(errorData),
        type: 'Redux-Saga',
        source: 'PlayRecordingErrorSaga',
        url: window.location.href,
        state: JSON.stringify(yield select(state => state)),
        userAgent: SerializeNavigator(window.navigator)
    }

    axios.post('/errors/logError', errorLogModel)
}

function SerializeNavigator (navigator) {
    const copy = {}

    for (let i in navigator)
        copy[i] = navigator[i]

    delete copy.plugins
    delete copy.mimeTypes

    return JSON.stringify(copy)
}
