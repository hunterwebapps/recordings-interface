import * as React from 'react'
import { object } from 'prop-types'
import Card from '../shared/Card'

VideoDetails.displayName = 'Video Details'

VideoDetails.propTypes = {
    recording: object
}

function VideoDetails ({ recording }) {
    if (!recording || !recording.title)
        recording = {
            title: 'Select a Video',
            duration: '00:00:00',
            meeting_started_at: { format: () => { } },
            recording_attendees: [],
            organizer: ''
        }

    return (
        <div className="video-details__container">
            <Card title={recording.title}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="details">
                            <h5><small>Duration</small></h5>
                            <p>{recording.duration}</p>
                        </div>

                        <div className="details">
                            <h5><small>Started</small></h5>
                            <p>{recording.meeting_started_at.format('MMM Do, YYYY @ h:mm a')}</p>
                        </div>

                        <div className="details">
                            <h5><small>Organizer</small></h5>
                            <p>{recording.organizer}</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="details">
                            <h5><small>Attendees</small></h5>
                            <ul className="list-unstyled">
                                {recording.recording_attendees.map(attendee =>
                                    <li key={attendee.id}>
                                        {attendee.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default VideoDetails
