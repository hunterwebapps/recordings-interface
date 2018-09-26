import { all } from 'redux-saga/effects'

import sharedWatcher from './modules/shared/shared.saga'
import recordingsWatcher from './modules/recordings/recordings.saga'
import standupGroupsWatcher from './modules/standup_groups/standup_groups.saga'
import standupReportsWatcher from './modules/standup_reports/standup_reports.saga'
import standupRowsWatcher from './modules/standup_rows/standup_rows.saga'

export default function* rootSaga () {
    yield all([
        ...sharedWatcher,
        ...recordingsWatcher,
        ...standupGroupsWatcher,
        ...standupReportsWatcher,
        ...standupRowsWatcher
    ])
}
