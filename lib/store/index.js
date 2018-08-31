import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from '../reducers'

const sagaMiddleware = createSagaMiddleware()
let createStore = reduxCreateStore

let store = createStore(rootReducer,
  // composeEnhancers(
    // applyMiddleware(
    //   // logMiddleware,
    //   // stateSaverMiddleware,
    //   sagaMiddleware
    // )
  // )
)

sagaMiddleware.run(rootSaga)

export default store
