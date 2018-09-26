import React from 'react'
import { arrayOf, object, func } from 'prop-types'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import { CreateComment } from '../../../store/modules/recordings/recordings.actions'
import { SelectActiveComments, SelectActiveRecording } from '../../../store/main.reducer'
import { secondsToTimestamp, timestampToSeconds } from '../../../helpers'

import Card from '../../presentation/shared/Card'
import VideoCommentList from '../../presentation/recordings/VideoCommentList'
import VideoCommentForm from '../../presentation/recordings/VideoCommentForm'

const timestampRegex = /^(([0-9]{1,2}):{1})?([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})$/

const mapStateToProps = state => ({
    comments: SelectActiveComments(state),
    recording: SelectActiveRecording(state)
})

const mapDispatchToProps = {
    CreateComment
}

export default connect(mapStateToProps, mapDispatchToProps)(
    class VideoComments extends React.PureComponent {
        state = {
            initialized: false,
            timestamp: '',
            currentTime: 0,
            paused: false,
            unsubscribe: null
        }

        static displayName = 'Video Comments'

        static propTypes = {
            comments: arrayOf(object).isRequired,
            CreateComment: func.isRequired,
            player: object.isRequired
        }

        commentListRef = React.createRef()

        componentDidMount () {
            this.startTimestamp()
        }

        startTimestamp = () => {
            const throttledUpdate = throttle(
                playerState => this.setState({
                    currentTime: playerState.currentTime,
                    timestamp: secondsToTimestamp(playerState.currentTime)
                }), 200)

            const unsubscribe = this.props.player.current.subscribeToStateChange(throttledUpdate)

            this.setState({
                unsubscribe,
                paused: false
            })
        }

        stopTimestamp = () => {
            this.state.unsubscribe()
            this.setState({
                paused: true
            })
        }

        setTimestamp = e => {
            const { value } = e.target

            if (!timestampRegex.test(value))
                return this.setState({ timestamp: value })

            this.setState({
                currentTime: timestampToSeconds(value),
                timestamp: value
            })
        }

        incTimestamp = () => {
            this.stopTimestamp()
            this.setState(state => ({
                currentTime: state.currentTime + 1,
                timestamp: secondsToTimestamp(state.currentTime + 1)
            }))
        }

        decTimestamp = () => {
            this.stopTimestamp()
            this.setState(state => ({
                currentTime: state.currentTime - 1,
                timestamp: secondsToTimestamp(state.currentTime - 1)
            }))
        }

        componentWillUnmount () {
            this.state.unsubscribe()
        }

        render () {
            const {
                comments,
                recording,
                player,
                CreateComment
            } = this.props

            const {
                timestamp,
                currentTime,
                paused
            } = this.state

            return (
                <div className="video-comments__container">
                    <Card title="Video Comments" padding={false}>
                        <VideoCommentList
                            comments={comments}
                            createComment={CreateComment}
                            recording={recording}
                            listRef={this.commentListRef}
                            player={player}
                        />
                        <VideoCommentForm
                            timestamp={timestamp}
                            currentTime={currentTime}
                            paused={paused}
                            cancelClick={this.startTimestamp}
                            focusTextbox={this.stopTimestamp}
                            setTimestamp={this.setTimestamp}
                            incTimestamp={this.incTimestamp}
                            decTimestamp={this.decTimestamp}
                            createComment={CreateComment}
                            recording={recording}
                            listRef={this.commentListRef}
                        />
                    </Card>
                </div>
            )
        }
    }
)
