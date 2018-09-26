import React from 'react'
import { } from 'prop-types'
import { connect } from 'react-redux'

import VideosTable from '../../presentation/recordings/VideosTable'
import { SelectRecordings, SelectAllVideosCount, SelectRecordingsLoading } from '../../../store/main.reducer'
import { GetRecordings } from '../../../store/modules/recordings/recordings.actions'

const mapStateToProps = state => ({
    recordings: SelectRecordings(state),
    allRecordingsCount: SelectAllVideosCount(state),
    loading: SelectRecordingsLoading(state)
})

const mapDispatchToProps = {
    GetRecordings
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class VideoSelect extends React.Component {
        state = {
            perPage: 20,
            offset: 0,
            currentPage: 0
        }

        static displayName = 'Video Select'

        componentDidMount () {
            this.props.GetRecordings(0, 20)
        }

        onPageChange = ({ selected }) => {
            const { perPage } = this.state
            const offset = Math.ceil(selected * perPage)

            this.setState({
                currentPage: selected,
                offset
            })

            this.props.GetRecordings(offset, perPage)
        }

        onSetPerPage = e => {
            const perPage = +e.target.value
            const offset = 0

            this.setState({
                perPage,
                offset
            })

            this.props.GetRecordings(offset, perPage)
        }

        render () {
            const {
                currentPage,
                perPage
            } = this.state

            const {
                recordings,
                allRecordingsCount,
                history,
                loading
            } = this.props

            return (
                <VideosTable
                    recordings={recordings}
                    perPage={perPage}
                    onPageChange={this.onPageChange}
                    onSetPerPage={this.onSetPerPage}
                    pageCount={Math.ceil(allRecordingsCount / perPage)}
                    currentPage={currentPage}
                    history={history}
                    loading={loading}
                />
            )
        }
    }
)
