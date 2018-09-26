import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import CreateSaga from 'redux-saga'

import rootReducer from './main.reducer'
import rootSaga from './main.saga'

const saga = CreateSaga()

export const history = createHistory()

const middleware = [
    routerMiddleware(history),
    saga
]

export const store = createStore(
    connectRouter(history)(rootReducer),
    {},
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)

const rootTask = saga.run(rootSaga)
rootTask.done.catch()
