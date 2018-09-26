import * as TYPES from './standup_reports.types'

const initialState = {
    all: [],
    current: {},
    periods: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_STANDUP_REPORTS:
            state = {
                ...state,
                all: payload
            }
            return state
        case TYPES.ADD_STANDUP_REPORT:
            state = {
                ...state,
                all: [
                    ...state.all,
                    payload
                ]
            }
            return state
        case TYPES.SET_STANDUP_REPORT_PERIODS:
            state = {
                ...state,
                periods: payload.periods,
                run_on: payload.run_on
            }
            return state
        default:
            return state
    }
}
