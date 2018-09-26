import React from 'react'
import { object, func, string } from 'prop-types'
import { secondsToTimestamp, timestampToSeconds } from '../../../helpers'

import VideoCommentForm from './VideoCommentForm'

const timestampRegex = /(([0-9]{1,2}):{1})?([0-5]?[0-9]{1}):([0-5]{1}[0-9]{1})/g

class VideoCommentCard extends React.PureComponent {
    state = {
        replying: false
    }

    static displayName = 'Video Comment Card'

    static propTypes = {
        comment: object.isRequired,
        createComment: func.isRequired,
        recording: object.isRequired,
        color: string.isRequired,
        player: object.isRequired
    }

    commentFormRef = React.createRef()
    commentCardRef = React.createRef()

    showReply = () =>
        this.setState({
            replying: true
        }, () => {
            const list = this.props.listRef.current
            const card = this.commentCardRef.current
            list.scrollTop = card.offsetTop + (card.offsetHeight - 300)
            this.commentFormRef.current.focus()
        })

    hideReply = () =>
        this.setState({
            replying: false
        }, () => {
            const list = this.props.listRef.current
            const card = this.commentCardRef.current
            list.scrollTop = card.offsetTop + (card.offsetHeight - 300)
        })

    onGotoTimestamp = timestamp => () => this.props.player.current.actions.seek(timestamp)

    parseTimestamps = comment => {
        let timestamp
        let parsedComment = []
        let lastIndex = 0
        // eslint-disable-next-line
        while (timestamp = timestampRegex.exec(comment)) {
            const seconds = timestampToSeconds(timestamp[0])

            parsedComment = parsedComment.concat([
                comment.substring(lastIndex, timestamp.index),
                <span
                    className="comment-timestamp"
                    onClick={this.onGotoTimestamp(seconds)}
                >
                    {timestamp[0]}
                </span>
            ])

            lastIndex = timestamp.index + timestamp[0].length
        }
        parsedComment.push(comment.substring(lastIndex))

        return parsedComment
    }

    render () {
        const {
            comment,
            recording,
            createComment,
            color
        } = this.props

        const {
            replying
        } = this.state

        const comments = [comment, ...comment.replies]

        return (
            <div ref={this.commentCardRef} className="video-comment-card__container">
                {comments.map((comment, index) =>
                    <div key={comment.id}>
                        {index !== 0 && <i className="fas fa-reply"></i>}
                        <div
                            className={(index !== 0 ? 'reply ' : '') + 'comment-card'}
                            style={{ borderLeftColor: color }}
                        >
                            {/*<div className="dropdown dropleft comment-menu">
                                <button className="btn btn-link btn-sm" type="button" data-toggle="dropdown">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item">
                                        <i className="fas fa-edit"></i>{' Edit'}
                                    </button>
                                    <button className="dropdown-item">
                                        <i className="fas fa-trash-alt"></i>{' Delete'}
                                    </button>
                                </div>
                            </div>*/}
                            <div className="comment-username">{comment.user.name || comment.user.email}</div>
                            <div className="comment-time">{comment.created_at.format('MM/DD/YY @ hh:mm a')}</div>
                            <span className="comment">
                                {comment.timestamp > 0 &&
                                    <span
                                        className="comment-timestamp"
                                        onClick={this.onGotoTimestamp(comment.timestamp)}
                                    >
                                        {secondsToTimestamp(comment.timestamp)}
                                    </span>
                                }
                                {this.parseTimestamps(comment.comment)}
                                <span className="comment-links">
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm"
                                        onClick={this.showReply}
                                    >
                                        {'Reply'}
                                    </button>
                                </span>
                            </span>
                        </div>
                    </div>
                )}

                {replying &&
                    <VideoCommentForm
                        createComment={createComment}
                        recording={recording}
                        cancelClick={this.hideReply}
                        replyToId={comment.id}
                        inputRef={this.commentFormRef}
                    />
                }
            </div>
        )
    }
}

export default VideoCommentCard
