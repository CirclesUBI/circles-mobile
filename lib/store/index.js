import { createStore, combineReducers } from 'redux'
import inventory from 'circles-mobile/lib/reducers/inventory'

let store = createStore(combineReducers({
  users: (state = {}, action) => state,
  inventory
}))

export default store
