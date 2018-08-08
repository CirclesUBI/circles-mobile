import { createStore, combineReducers } from 'redux'

let store = createStore(combineReducers({users: (state = {}, action) => state}))

export default store
