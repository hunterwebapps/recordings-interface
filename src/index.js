import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import { history, store } from './store/store'
import ErrorCatch from './components/container/shared/ErrorCatch'
import './index.css'
import './col-xxl.css'

import VideoSelect from './components/container/recordings/VideoSelect'
import VideoReview from './components/container/recordings/VideoReview'
import VideoPublic from './components/container/recordings/VideoPublic'
import StandupEdit from './components/container/standups/StandupEdit'

window.onload = () =>
    ReactDOM.render(
        <ErrorCatch type="React-root" store={store}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/recordings" component={VideoSelect} />
                        <Route path="/recordings/shared/:recordingId" component={VideoPublic} />
                        <Route path="/recordings/:recordingId" component={VideoReview} />
                        <Route path="/standups/edit/:groupId?/:reportId?" component={StandupEdit} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        </ErrorCatch>,
        document.getElementById('react-app')
    )
