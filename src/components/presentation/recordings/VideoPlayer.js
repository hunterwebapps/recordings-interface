import * as React from 'react'
import { object, func } from 'prop-types'
import {
    Player,
    LoadingSpinner,
    ControlBar,
    PlaybackRateMenuButton,
    ForwardControl,
    ReplayControl,
    VolumeMenuButton,
    PlayToggle,
    BigPlayButton
} from 'video-react'
import 'video-react/dist/video-react.css'

VideoPlayer.displayName = 'Video Player'

VideoPlayer.propTypes = {
    recording: object,
    playerRef: object.isRequired,
    onError: func.isRequired
}

function VideoPlayer ({ recording, playerRef, onError }) {
    return (
        <div className="video-player__container">
            <Player
                src={recording ? recording.signed_url : ''}
                poster={recording && recording.preview}
                preload="auto"
                autoPlay
                ref={playerRef}
                onError={onError}
            >
                <BigPlayButton position="center" />
                <LoadingSpinner />
                <ControlBar autoHide={true}>
                    <PlayToggle order={1.1} />
                    <ReplayControl seconds={10} order={2.1} />
                    <ForwardControl seconds={10} order={2.2} />
                    <VolumeMenuButton vertical order={3.1} />
                    <PlaybackRateMenuButton
                        rates={[2.5, 2, 1.75, 1.5, 1.25, 1, 0.5]}
                        order={7.1}
                    />
                </ControlBar>
            </Player>
        </div>
    )
}

export default VideoPlayer
