import * as TYPES from './standup_rows.types'
import { Standups } from '../../api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { RequestError } from '../shared/shared.actions'
import { SetStandupRowMetrics, SetStandupRows, GetStandupRows } from './standup_rows.actions'
import { SetStandupReportPeriods } from '../standup_reports/standup_reports.actions'

export default [
    takeLatest(TYPES.GET_STANDUP_ROWS, GetStandupRowsSaga),
    takeLatest(TYPES.GET_STANDUP_ROW_METRICS, GetStandupMetricsSaga)
]

function* GetStandupMetricsSaga () {
    const res = yield call(Standups.Metrics.Get)

    if (res && res.status === 200) {
        yield put(SetStandupRowMetrics({
            metrics: res.data.metrics,
            ranges: res.data.date_ranges
        }))
        yield put(SetStandupReportPeriods({
            periods: res.data.run_periods,
            run_on: res.data.run_on
        }))
    } else {
        console.log(res)
    }
}

function* GetStandupRowsSaga () {
    const res = yield call(Standups.Rows.Get)

    try {
        yield put(SetStandupRows(res.data))
    } catch (ex) {
        yield put(
            RequestError(
                GetStandupRows(),
                'Failed to Get Standup Metrics, Retrying... (Check your internet, try refreshing)',
                ex
            )
        )
    }
}
