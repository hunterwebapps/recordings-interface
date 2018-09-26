import * as TYPES from './standup_groups.types'

export const GetStandupGroups = () => ({
    type: TYPES.GET_STANDUP_GROUPS
})

export const SetStandupGroups = groups => ({
    type: TYPES.SET_STANDUP_GROUPS,
    payload: groups
})

export const CreateStandupGroup = (groupModel, bag) => ({
    type: TYPES.CREATE_STANDUP_GROUP,
    payload: groupModel,
    meta: bag
})

export const AddStandupGroup = group => ({
    type: TYPES.ADD_STANDUP_GROUP,
    payload: group
})

export const SelectStandupGroup = group => ({
    type: TYPES.SELECT_STANDUP_GROUP,
    payload: group
})
