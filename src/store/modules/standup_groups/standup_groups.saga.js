import * as TYPES from './standup_groups.types'
import { Standups } from '../../api'
import { takeLatest, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { RequestError } from '../shared/shared.actions'
import { SetStandupGroups, AddStandupGroup } from './standup_groups.actions'

export default [
    takeLatest(TYPES.GET_STANDUP_GROUPS, GetStandupGroupsSaga),
    takeLatest(TYPES.CREATE_STANDUP_GROUP, CreateStandupGroupSaga)
]

function* GetStandupGroupsSaga () {
    const res = yield call(Standups.Groups.Get)

    yield put(SetStandupGroups(res.data))
}

function* CreateStandupGroupSaga ({ payload, meta }) {
    meta.setStatus({ loading: true })

    const res = yield call(Standups.Groups.Create, payload)

    if (res && res.status === 201) {
        yield put(AddStandupGroup(res.data))
        yield put(push(`/standups/edit/${ res.data.id }`))
    } else {
        yield put(RequestError(res))
    }

    meta.setStatus({ loading: false })
}
