// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, VALIDATE_USER } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  address: '0x',
  name: 'Ashoka Finley',
  balance: 10000,
  selectedOrgWallet: 'Knitted Socks Org',
  selectedTransactionWallet: '',
  validated: false
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_WALLET_SELECTED:
      return Object.assign({}, state, {selectedTransactionWallet: action.wallet})
    case WALLET_SELECTED:
      return Object.assign({}, state, {selectedOrgWallet: action.wallet})
    case VALIDATE_USER:
      return Object.assign({}, state, {validated: true})
    default:
      return state
  }
}
