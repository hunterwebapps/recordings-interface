import { combineReducers } from 'redux'

import recordingsReducer from './modules/recordings/recordings.reducer'
import teammatesReducer from './modules/teammates/teammates.reducer'
import standupGroupsReducer from './modules/standup_groups/standup_groups.reducer'
import standupReportsReducer from './modules/standup_reports/standup_reports.reducer'
import standupRowsReducer from './modules/standup_rows/standup_rows.reducer'
import sharedReducer from './modules/shared/shared.reducer'

export default combineReducers({
    recordings: recordingsReducer,
    teammates: teammatesReducer,
    standupGroups: standupGroupsReducer,
    standupReports: standupReportsReducer,
    standupRows: standupRowsReducer,
    shared: sharedReducer
})

/* * * * * * *
 * Selectors *
 * * * * * * */

// Shared

export const SelectErrorCount = state => state.shared.errors

// Recordings

export const SelectRecordings = state => state.recordings.all

export const SelectAllVideosCount = state => state.recordings.totalCount

export const SelectActiveRecording = state => state.recordings.current

export const SelectActiveComments = state => {
    const comments = state.recordings.comments.filter(comment =>
        comment.recording_id === state.recordings.current.id &&
        comment.recording_comments_id === null
    )

    comments.forEach(comment => {
        comment.user = SelectUserById(state, comment.user_id)
        comment.replies = state.recordings.comments.filter(reply => reply.recording_comments_id === comment.id)
        comment.replies.forEach(reply => reply.user = SelectUserById(state, reply.user_id))
    })

    return comments
}

export const SelectRecordingsLoading = state => state.recordings.loading

// Teammates

export const SelectUserById = (state, userId) => state.teammates.all.find(user => user.id === userId)

export const SelectTeammates = state => state.teammates.all

// Standup Reports

export const SelectStandupReportsByGroupId = (state, groupId) =>
    state.standupReports.all.filter(report => report.standup_group_ids.includes(groupId))

export const SelectStandupReportByReportId = (state, reportId) =>
    state.standupReports.all.find(report => report.id === reportId)

export const SelectStandupReportPeriods = state => state.standupReports.periods

// Standup Groups

export const SelectStandupGroups = state => state.standupGroups.all

export const SelectStandupGroupById = (state, groupId) =>
    state.standupGroups.all.find(group => group.id === groupId)

export const SelectCurrentStandupGroup = state => state.standupGroups.current

// Standup Rows

export const SelectStandupRows = state => state.standupRows.all

export const SelectStandupRowsByReportId = (state, reportId) =>
    state.standupRows.all.filter(row => row.standup_report_id === reportId)

export const SelectStandupMetrics = state => state.standupRows.metrics

export const SelectStandupRanges = state => state.standupRows.ranges


// Router

export const SelectRouterLocationPath = state => state.router.location.pathname
