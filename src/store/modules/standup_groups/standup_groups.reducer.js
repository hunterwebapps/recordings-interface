import * as TYPES from './standup_groups.types'

const initialState = {
    all: [],
    current: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TYPES.SET_STANDUP_GROUPS:
            state = {
                ...state,
                all: payload
            }
            return state
        case TYPES.ADD_STANDUP_GROUP:
            state = {
                ...state,
                all: [
                    ...state.all,
                    payload
                ]
            }
            return state
        case TYPES.SELECT_STANDUP_GROUP:
            state = {
                ...state,
                current: state.all.filter(group => group.id === payload)
            }
            return state
        default:
            return state
    }
}
