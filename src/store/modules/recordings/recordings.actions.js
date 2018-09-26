import * as TYPES from './recordings.types'

export const GetRecordings = (offset, limit) => ({
    type: TYPES.GET_RECORDINGS,
    payload: {
        offset,
        limit
    }
})

export const SetRecordings = recordings => ({
    type: TYPES.SET_RECORDINGS,
    payload: recordings
})

export const SetTotalRecordings = count => ({
    type: TYPES.SET_TOTAL_RECORDINGS,
    payload: count
})

export const GetSignedUrl = recordingId => ({
    type: TYPES.GET_SIGNED_URL,
    payload: recordingId
})

export const GetPublicSignedUrl = (recordingId, authToken) => ({
    type: TYPES.GET_PUBLIC_SIGNED_URL,
    payload: {
        recordingId,
        authToken
    }
})

export const SetActiveRecording = recording => ({
    type: TYPES.SET_ACTIVE_RECORDING,
    payload: recording
})

export const SetRecordingComments = comments => ({
    type: TYPES.SET_RECORDING_COMMENTS,
    payload: comments
})

export const GetShareableLink = (shareModel, bag) => ({
    type: TYPES.GET_SHAREABLE_LINK,
    payload: shareModel,
    meta: bag
})

export const SetShareableLink = shareableLink => ({
    type: TYPES.SET_SHAREABLE_LINK,
    payload: shareableLink
})

export const CreateComment = (commentModel, bag) => ({
    type: TYPES.CREATE_COMMENT,
    payload: commentModel,
    meta: bag
})

export const AddComment = comment => ({
    type: TYPES.ADD_COMMENT,
    payload: comment
})

export const DeleteRecording = (recordingId, callback) => ({
    type: TYPES.DELETE_RECORDING,
    payload: recordingId,
    meta: { callback }
})

export const LoadingRecordings = loading => ({
    type: TYPES.LOADING_RECORDINGS,
    payload: loading
})

export const PlayRecordingError = error => ({
    type: TYPES.PLAY_RECORDING_ERROR,
    payload: error
})
