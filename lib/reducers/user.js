// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, VALIDATE_USER } from 'circles-mobile/lib/constants/UserConstants'

let initialState = {
  address: '0x',
  name: 'Ashoka Finley',
  balance: 10000,
  selectedWallet: 'Ashoka Finley',
  selectedTransactionWallet: 'Ashoka Finley',
  validated: false
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_WALLET_SELECTED:
      return Object.assign({}, state, {selectedTransactionWallet: action.wallet})
    case WALLET_SELECTED:
      return Object.assign({}, state, {selectedWallet: action.wallet})
    case VALIDATE_USER:
      return Object.assign({}, state, {validated: true})
    default:
      return state
  }
}
