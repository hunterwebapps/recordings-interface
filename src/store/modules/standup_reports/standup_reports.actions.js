import * as TYPES from './standup_reports.types'

export const GetStandupReports = () => ({
    type: TYPES.GET_STANDUP_REPORTS
})

export const SetStandupReports = reports => ({
    type: TYPES.SET_STANDUP_REPORTS,
    payload: reports
})

export const CreateStandupReport = (reportModel, bag) => ({
    type: TYPES.CREATE_STANDUP_REPORT,
    payload: reportModel,
    meta: bag
})

export const AddStandupReport = report => ({
    type: TYPES.ADD_STANDUP_REPORT,
    payload: report
})

export const SetStandupReportPeriods = periods => ({
    type: TYPES.SET_STANDUP_REPORT_PERIODS,
    payload: periods
})
