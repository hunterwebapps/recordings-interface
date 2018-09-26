import * as React from 'react'
import { arrayOf, object, func, number, bool } from 'prop-types'
import Pagination from '../shared/Pagination'
import videoPreview from '../../../images/preview.png'

VideosTable.displayName = 'Videos Table'

VideosTable.propTypes = {
    recordings: arrayOf(object).isRequired,
    perPage: number.isRequired,
    onPageChange: func.isRequired,
    onSetPerPage: func.isRequired,
    pageCount: number.isRequired,
    currentPage: number.isRequired,
    loading: bool.isRequired
}

function VideosTable ({
    recordings,
    perPage,
    onPageChange,
    onSetPerPage,
    pageCount,
    currentPage,
    history,
    loading
}) {
    const handleNavigate = videoId =>
        () => history.push(`/recordings/${ videoId }`)

    let loadingOutput = null
    if (loading) {
        loadingOutput = (
            <tr>
                <td colSpan="5" className="text-center">
                    <div className="lds-ring" style={{ marginTop: '15px' }}><div></div><div></div><div></div><div></div></div>
                </td>
            </tr>
        )
    } else if (loading === null) {
        loadingOutput = <h2>Failed to Load. Please try refreshing (Support notified)...</h2>
    }

    return (
        <div className="videos-table__container">
            <Pagination
                pageCount={pageCount}
                onPageChange={onPageChange}
                onSetPerPage={onSetPerPage}
                perPage={perPage}
                forcePage={currentPage}
            />

            <div className="table-responsive">
                <table className="table table-hover table-borderless">
                    <thead>
                        <tr>
                            <th width="1%"></th>
                            <th>Title</th>
                            <th>Duration</th>
                            <th>Organizer</th>
                            <th>Meeting Started</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && recordings.length === 0 ?
                            <tr>
                                <td colSpan="5">
                                    <h2 className="text-center mt-3">No Recordings</h2>
                                </td>
                            </tr>
                            :
                            recordings.map((video, index) =>
                                <tr
                                    key={video.id}
                                    onClick={handleNavigate(video.id)}
                                    tabIndex={300 + index}
                                >
                                    <td>
                                        {video.preview &&
                                            <img
                                                src={video.preview || videoPreview}
                                                alt={video.title}
                                                className="video-preview"
                                            />
                                        }
                                    </td>
                                    <td>{video.title}</td>
                                    <td>{video.duration}</td>
                                    <td>{video.organizer}</td>
                                    <td>{video.meeting_started_at.format('MMM Do, YYYY @ h:mm a')}</td>
                                </tr>
                            )}
                        {loadingOutput}
                    </tbody>
                </table>
            </div>

            <Pagination
                pageCount={pageCount}
                onPageChange={onPageChange}
                onSetPerPage={onSetPerPage}
                perPage={perPage}
                forcePage={currentPage}
            />
        </div>
    )
}

export default VideosTable
