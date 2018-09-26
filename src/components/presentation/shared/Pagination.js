import * as React from 'react'
import { number, func } from 'prop-types'
import Paginator from 'react-paginate'

Pagination.displayName = 'Pagination'

Pagination.propTypes = {
    onPageChange: func.isRequired,
    onSetPerPage: func.isRequired,
    pageCount: number.isRequired,
    perPage: number.isRequired,
    forcePage: number
}

function Pagination ({ onSetPerPage, perPage, ...rest }) {
    return (
        <div className="videos-pagination__container">
            <label>Per Page:</label>
            <select className="form-control per-page-select" onChange={onSetPerPage} value={perPage}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <Paginator
                previousLabel={<i className="material-icons">arrow_back_ios</i>}
                nextLabel={<i className="material-icons">arrow_forward_ios</i>}
                breakLabel={<a>...</a>}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
                pageLinkClassName="pageLink"
                {...rest}
            />
            <div className="clearfix"></div>
        </div>
    )
}

export default Pagination
