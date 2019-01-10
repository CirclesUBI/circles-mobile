import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from '../reducers'

import loggingMiddleware from './loggingMiddleware'

const sagaMiddleware = createSagaMiddleware()
let createStore = reduxCreateStore

let store = createStore(rootReducer,
  // composeEnhancers(
  applyMiddleware(
    loggingMiddleware,
    // stateSaverMiddleware,
    sagaMiddleware
  )
  // )
)

sagaMiddleware.run(rootSaga)

export default store
