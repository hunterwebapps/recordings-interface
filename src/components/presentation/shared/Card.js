import React from 'react'
import { oneOfType, string, node, bool } from 'prop-types'

Card.propTypes = {
    title: oneOfType([string, node]),
    padding: bool
}

function Card ({ children, title, padding = true }) {
    return (
        <div className="card">
            {title &&
                <div className="card-header d-flex align-items-center">
                    {title}
                </div>
            }
            <div className="card-body" style={padding ? {} : { padding: '0' }}>
                {children}
            </div>
        </div>
    )
}

export default Card
