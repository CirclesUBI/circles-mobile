import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

import loggingMiddleware from './loggingMiddleware'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  applyMiddleware(
    loggingMiddleware,
    sagaMiddleware
  )
)

sagaMiddleware.run(rootSaga)

export default store
