import { createStore, combineReducers } from 'redux'
import inventory from 'circles-mobile/lib/reducers/inventory'
import user from 'circles-mobile/lib/reducers/user'
import vendors from 'circles-mobile/lib/reducers/vendors'
import wallets from 'circles-mobile/lib/reducers/wallets'
import app from 'circles-mobile/lib/reducers/app'

let store = createStore(combineReducers({
  user,
  vendors,
  inventory,
  wallets,
  app
}))

export default store
