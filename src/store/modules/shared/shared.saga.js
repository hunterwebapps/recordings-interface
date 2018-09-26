import * as TYPES from './shared.types'
import { GetRecordings } from '../recordings/recordings.actions'
import { GetStandupGroups } from '../standup_groups/standup_groups.actions'
import { GetStandupReports } from '../standup_reports/standup_reports.actions'
import { GetStandupRows, GetStandupRowMetrics } from '../standup_rows/standup_rows.actions'
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { SelectErrorCount } from '../../main.reducer'

export default [
    takeEvery(TYPES.REQUEST_ERROR, RequestErrorSaga),
    takeLatest(TYPES.INITIALIZE_RECORDINGS, InitializeRecordingsSaga),
    takeLatest(TYPES.INITIALIZE_STANDUPS, InitializeStandupsSaga)
]

function* InitializeRecordingsSaga () {
    yield put(GetRecordings())
}

function* InitializeStandupsSaga () {
    yield put(GetStandupRowMetrics())
    yield put(GetStandupGroups())
    yield put(GetStandupReports())
    yield put(GetStandupRows())
}

function* RequestErrorSaga ({ payload }) {
    const errorCount = yield select(SelectErrorCount)

    if (errorCount > 10) {
        if (window.toastr)
            window.toastr.error('Could not complete request. Please check your internet and try refreshing.', 'Failed to Load')

        throw new Error(`Message: ${ payload.exception.message }, Action: ${ JSON.stringify(payload.action) }`)
    }

    if (window.toastr)
        window.toastr.error(payload.message, 'Failed to Load')

    yield delay(5000)

    yield put(payload.action)
}
