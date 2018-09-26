import * as TYPES from './shared.types'

const initialState = {
    errors: 0
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.REQUEST_ERROR:
            state = {
                ...state,
                errors: state.errors + 1
            }
            return state
        default:
            return state
    }
}
