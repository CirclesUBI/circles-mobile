import { combineReducers } from 'redux'

import inventory from 'circles-mobile/lib/reducers/inventory'
import user from 'circles-mobile/lib/reducers/user'
import vendors from 'circles-mobile/lib/reducers/vendors'
import wallets from 'circles-mobile/lib/reducers/wallets'
import app from 'circles-mobile/lib/reducers/app'
import authorization from 'circles-mobile/lib/reducers/authorization'
import onboarding from 'circles-mobile/lib/reducers/onboarding'

const appReducer = combineReducers({
  user,
  vendors,
  inventory,
  wallets,
  app,
  authorization,
  onboarding
})

// const rootReducer = (state, action) => {
//   return appReducer(globalReducer(state, action), action)
// }

export default appReducer
