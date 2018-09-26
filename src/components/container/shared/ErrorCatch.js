import * as React from 'react'
import axios from 'axios'
import { string, object } from 'prop-types'

class ErrorCatch extends React.Component {
    static displayName = 'Error Catch'

    static propTypes = {
        type: string.isRequired,
        store: object
    }

    componentDidCatch (err, info) {
        console.log(err, info)

        const storeState = this.props.store.getState()
        const navigator = SerializeNavigator(window.navigator)

        const errorLogModel = {
            message: err.message,
            type: this.props.type + ' ' + err.type,
            source: info,
            url: window.location.href,
            state: JSON.stringify(storeState),
            userAgent: navigator
        }

        axios.post('/errors/logError', errorLogModel)
    }

    render () {
        return this.props.children
    }
}

export default ErrorCatch

function SerializeNavigator (navigator) {
    const copy = {}

    for (let i in navigator)
        copy[i] = navigator[i]

    delete copy.plugins
    delete copy.mimeTypes

    return JSON.stringify(copy)
}