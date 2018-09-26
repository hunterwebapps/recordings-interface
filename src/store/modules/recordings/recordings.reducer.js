import * as TYPES from './recordings.types'

const initialState = {
    all: [],
    current: {},
    comments: [],
    totalCount: 0,
    loading: true
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.GET_RECORDINGS:
            state = {
                ...state,
                all: []
            }
            return state
        case TYPES.SET_RECORDINGS:
            state = {
                ...state,
                all: payload
            }
            return state
        case TYPES.SET_TOTAL_RECORDINGS:
            state = {
                ...state,
                totalCount: payload
            }
            return state
        case TYPES.SET_ACTIVE_RECORDING:
            state = {
                ...state,
                current: payload
            }
            return state
        case TYPES.SET_RECORDING_COMMENTS:
            state = {
                ...state,
                comments: payload
            }
            return state
        case TYPES.SET_SHAREABLE_LINK:
            state = {
                ...state,
                current: {
                    ...state.current,
                    shareable_url: payload
                }
            }
            return state
        case TYPES.ADD_COMMENT:
            state = {
                ...state,
                comments: [
                    ...state.comments,
                    payload
                ]
            }
            return state
        case TYPES.DELETE_RECORDING:
            state = {
                ...state,
                all: state.all.filter(recording => recording.id !== payload),
                current: {}
            }
            return state
        case TYPES.LOADING_RECORDINGS:
            state = {
                ...state,
                loading: payload
            }
            return state
        default:
            return state
    }
}
