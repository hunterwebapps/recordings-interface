import * as TYPES from './teammates.types'

const initialState = {
    all: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_TEAMMATES:
            state = {
                ...state,
                all: payload
            }
            return state
        default:
            return state
    }
}
