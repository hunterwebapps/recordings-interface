import * as TYPES from './standup_reports.types'
import { Standups } from '../../api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { RequestError } from '../shared/shared.actions'
import { SetStandupReports, GetStandupReports, AddStandupReport } from './standup_reports.actions'

export default [
    takeLatest(TYPES.GET_STANDUP_REPORTS, GetStandupReportsSaga),
    takeLatest(TYPES.CREATE_STANDUP_REPORT, CreateStandupReportSaga)
]

function* GetStandupReportsSaga () {
    const res = yield call(Standups.Reports.Get)

    try {
        yield put(SetStandupReports(res.data))

    } catch (ex) {
        yield put(
            RequestError(
                GetStandupReports(),
                'Failed to Get Standup Metrics, Retrying... (Check your internet, try refreshing)',
                ex
            )
        )
    }
}

function* CreateStandupReportSaga ({ payload, meta }) {
    meta.setStatus({ loading: true })

    const res = yield call(Standups.Reports.Create, payload)

    if (res && res.status === 201) {
        yield put(push(`/standups/edit/${ payload.group_id }/${ res.data.id }`))
        yield put(AddStandupReport(res.data))
    } else {
        console.log(res)
    }

    meta.setStatus({ loading: false })
}
