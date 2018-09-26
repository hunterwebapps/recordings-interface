import React from 'react'
import { arrayOf, object, func, any } from 'prop-types'
import VideoCommentCard from './VideoCommentCard'

const colorCodes = ['#2b90d9', '#28a745', '#dc3545', '#868e96', '#FF8800']

class VideoCommentList extends React.PureComponent {

    static displayName = 'Video Comment List'

    static propTypes = {
        comments: arrayOf(object),
        createComment: func.isRequired,
        recording: object.isRequired,
        listRef: any.isRequired,
        player: object.isRequired
    }

    render () {
        const {
            comments,
            createComment,
            recording,
            listRef,
            player
        } = this.props

        if (comments.length > colorCodes.length)
            while (comments.length > colorCodes.length)
                colorCodes.push(...colorCodes)

        return (
            <div ref={listRef} className="video-comments-list__container">
                {comments.length ?
                    comments.map((comment, index) =>
                        <VideoCommentCard
                            key={comment.id}
                            comment={comment}
                            createComment={createComment}
                            recording={recording}
                            listRef={listRef}
                            color={colorCodes[index]}
                            player={player}
                        />
                    )
                    :
                    recording.title ?
                        <h4 className="text-muted text-normal text-center">
                            {'No Comments Yet!'}
                        </h4>
                        :
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                }
            </div>
        )
    }
}

export default VideoCommentList
