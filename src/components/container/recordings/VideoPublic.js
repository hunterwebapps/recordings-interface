import React from 'react'
import { connect } from 'react-redux'
import { SelectActiveRecording } from '../../../store/main.reducer'
import { GetPublicSignedUrl } from '../../../store/modules/recordings/recordings.actions'

import VideoPlayer from '../../presentation/recordings/VideoPlayer'
import VideoDetails from '../../presentation/recordings/VideoDetails'

const mapStateToProps = state => ({
    recording: SelectActiveRecording(state)
})

const mapDispatchToProps = {
    GetPublicSignedUrl
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class VideoShare extends React.Component {

        static displayName = 'Video Share'

        componentDidMount () {
            const { recordingId } = this.props.match.params
            this.props.GetPublicSignedUrl(recordingId)
        }

        render () {
            const {
                recording
            } = this.props

            return (
                <div className="row">
                    <div className="col-12 col-sm-4 pr-sm-0">
                        <VideoDetails recording={recording} />
                    </div>
                    <div className="col-12 col-sm-8">
                        <VideoPlayer recording={recording} />
                    </div>
                </div>
            )
        }
    }
)
