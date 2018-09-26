import * as TYPES from './teammates.types'

export const SetTeammates = teammates => ({
    type: TYPES.SET_TEAMMATES,
    payload: teammates
})
