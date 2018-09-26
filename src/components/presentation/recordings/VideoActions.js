import React from 'react'
import { func } from 'prop-types'

VideoActions.displayName = 'Video Actions'

VideoActions.propTypes = {
    onShare: func.isRequired,
    onDelete: func.isRequired
}

function VideoActions ({ onShare, onDelete }) {
    return (
        <div className="video-actions__container">
            <div className="btn-group btn-group-sm d-flex mb-3 mt-3 mt-sm-0">
                <button onClick={onShare} className="btn btn-primary w-100">
                    <i className="fas fa-share-square"></i>{' Share Call'}
                </button>
                <button onClick={onDelete} className="btn btn-danger w-50">
                    <i className="fas fa-trash-alt"></i>{' Delete'}
                </button>
            </div>
        </div>
    )
}

export default VideoActions
