import React from 'react'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import VideoComments from './VideoComments'
import VideoPlayer from '../../presentation/recordings/VideoPlayer'
import VideoDetails from '../../presentation/recordings/VideoDetails'
import VideoActions from '../../presentation/recordings/VideoActions'
import VideoShare from '../../presentation/recordings/VideoShare'
import { SelectActiveRecording, SelectTeammates } from '../../../store/main.reducer'
import { GetSignedUrl, GetShareableLink, DeleteRecording, PlayRecordingError } from '../../../store/modules/recordings/recordings.actions'

const mapStateToProps = state => ({
    recording: SelectActiveRecording(state),
    teammates: SelectTeammates(state)
})

const mapDispatchToProps = {
    GetSignedUrl,
    GetShareableLink,
    DeleteRecording,
    PlayRecordingError
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class VideoReview extends React.Component {
        state = {
            showShare: false
        }

        static displayName = 'Video Review'

        videoPlayer = React.createRef()

        componentDidMount () {
            const { recordingId } = this.props.match.params
            this.props.GetSignedUrl(recordingId)
        }

        onGoBack = () => this.props.history.goBack()

        onShowShare = () => this.setState({ showShare: true })
        onHideShare = () => this.setState({ showShare: false })

        confirmDelete = () => confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this recording?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.DeleteRecording(
                            this.props.recording.id,
                            () => this.props.history.push('/recordings')
                        )
                    }
                },
                { label: 'No' }
            ]
        })

        render () {
            const {
                showShare
            } = this.state

            const {
                GetShareableLink,
                PlayRecordingError,
                teammates,
                recording
            } = this.props

            return (
                <React.Fragment>
                    <div className="go-back">
                        <span onClick={this.onGoBack}>
                            <i className="fas fa-arrow-circle-left"></i>{' Go Back'}
                        </span>
                    </div>

                    <div className="row">
                        <div className="col-12 col-xl-9 col-lg-8 col-sm-7">
                            <div className="row">
                                <div className="col-12 col-xl-5 pr-xl-0">
                                    <VideoDetails recording={recording} />
                                </div>
                                <div className="col-12 col-xl-7">
                                    <VideoPlayer
                                        recording={recording}
                                        playerRef={this.videoPlayer}
                                        onError={PlayRecordingError}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-3 col-lg-4 col-sm-5 pl-sm-0">
                            <VideoActions
                                onShare={this.onShowShare}
                                onDelete={this.confirmDelete}
                            />
                            <VideoShare
                                teamMembers={teammates}
                                show={showShare}
                                hide={this.onHideShare}
                                getLink={GetShareableLink}
                                recording={recording}
                            />
                            <VideoComments player={this.videoPlayer} />
                        </div>
                    </div>
                </React.Fragment>

            )
        }
    }
)
