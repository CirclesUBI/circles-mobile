// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  address: '0x',
  name: 'Ashoka Finley',
  balance: 10000,
  selectedOrgWallet: 'Knitted Socks Org'
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case WALLET_SELECTED:
      return Object.assign({}, state, {selectedOrgWallet: action.wallet})
    default:
      return state
  }
}
