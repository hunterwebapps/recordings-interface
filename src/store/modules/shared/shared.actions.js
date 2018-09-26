import * as TYPES from './shared.types'

export const InitializeRecordings = () => ({
    type: TYPES.INITIALIZE_RECORDINGS
})

export const InitializeStandups = () => ({
    type: TYPES.INITIALIZE_STANDUPS
})

export const RequestError = (action, message, exception) => ({
    type: TYPES.REQUEST_ERROR,
    payload: {
        action,
        message,
        exception
    }
})
