import * as TYPES from './standup_rows.types'

export const GetStandupRows = () => ({
    type: TYPES.GET_STANDUP_ROWS
})

export const SetStandupRows = rows => ({
    type: TYPES.SET_STANDUP_ROWS,
    payload: rows
})

export const CreateStandupRow = (rowModel, bag) => ({
    type: TYPES.CREATE_STANDUP_ROW,
    payload: rowModel,
    meta: bag
})

export const AddStandupRow = row => ({
    type: TYPES.ADD_STANDUP_ROW,
    payload: row
})

export const GetStandupRowMetrics = () => ({
    type: TYPES.GET_STANDUP_ROW_METRICS
})

export const SetStandupRowMetrics = metrics => ({
    type: TYPES.SET_STANDUP_ROW_METRICS,
    payload: metrics
})
