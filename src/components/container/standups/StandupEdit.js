import React from 'react'
import { connect } from 'react-redux'
import { InitializeStandups } from '../../../store/modules/shared/shared.actions'
import { CreateStandupGroup } from '../../../store/modules/standup_groups/standup_groups.actions'
import { CreateStandupReport } from '../../../store/modules/standup_reports/standup_reports.actions'
import { CreateStandupRow } from '../../../store/modules/standup_rows/standup_rows.actions'
import {
    SelectStandupGroups,
    SelectStandupMetrics,
    SelectStandupRanges,
    SelectStandupGroupById,
    SelectStandupReportsByGroupId,
    SelectStandupRowsByReportId,
    SelectStandupReportByReportId,
    SelectStandupReportPeriods
} from '../../../store/main.reducer'

import StandupReport from '../../presentation/standups/StandupReport'
import StandupGroup from '../../presentation/standups/StandupGroup'

const mapStateToProps = (state, { match: { params: { groupId, reportId } } }) => ({
    groups: SelectStandupGroups(state),
    selectedGroup: SelectStandupGroupById(state, +groupId),
    reports: SelectStandupReportsByGroupId(state, +groupId),
    selectedReport: SelectStandupReportByReportId(state, +reportId),
    rows: SelectStandupRowsByReportId(state, +reportId),
    metrics: SelectStandupMetrics(state),
    ranges: SelectStandupRanges(state),
    periods: SelectStandupReportPeriods(state)
})

const mapDispatchToProps = {
    InitializeStandups,
    CreateStandupGroup,
    CreateStandupReport,
    CreateStandupRow
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class StandupEdit extends React.Component {
        static displayName = 'Standup Edit'

        componentDidMount () {
            this.props.InitializeStandups()
        }

        handleSelectGroup = groupId =>
            this.props.history.push(`/standups/edit/${ groupId }`)

        handleCreateGroup = (name, bag) =>
            this.props.CreateStandupGroup({ name }, bag)

        handleSelectReport = reportId =>
            this.props.history.push(`/standups/edit/${ this.props.match.params.groupId }/${ reportId }`)

        handleCreateReport = (name, bag) =>
            this.props.CreateStandupReport({
                name,
                group_id: this.props.match.params.groupId
            }, bag)

        handleCreateRow = (rowModel, bag) =>
            this.props.CreateStandupRow(rowModel, bag)

        render () {
            const {
                groups,
                reports,
                rows,
                metrics,
                ranges,
                periods,
                selectedGroup,
                selectedReport
            } = this.props

            return (
                <React.Fragment>
                    <StandupGroup
                        groups={groups}
                        selectedGroup={selectedGroup}
                        reports={reports}
                        selectGroup={this.handleSelectGroup}
                        createGroup={this.handleCreateGroup}
                    />
                    <StandupReport
                        rows={rows}
                        metrics={metrics}
                        ranges={ranges}
                        periods={periods}
                        group={selectedGroup}
                        report={selectedReport}
                        reports={reports}
                        selectReport={this.handleSelectReport}
                        createReport={this.handleCreateReport}
                        createRow={this.handleCreateRow}
                    />
                </React.Fragment>

            )
        }
    }
)
