import * as TYPES from './standup_rows.types'

const initialState = {
    all: [],
    current: {},
    metrics: [],
    ranges: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_STANDUP_ROWS:
            state = {
                ...state,
                rows: payload
            }
            return state
        case TYPES.SET_STANDUP_ROW_METRICS:
            state = {
                ...state,
                metrics: payload.metrics,
                ranges: payload.ranges,
                periods: payload.periods
            }
            return state
        case TYPES.ADD_STANDUP_ROW:
            state = {
                ...state,
                all: [
                    ...state.all,
                    payload
                ]
            }
            return state
        default:
            return state
    }
}
