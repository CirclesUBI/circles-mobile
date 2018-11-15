// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, VALIDATE_USER } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_DATA } from '../constants/OnboardingConstants'

let initialState = {
  address: '0x',
  loggedIn: false,
  name: '',
  phone: '',
  email: '',
  selectedWallet: '',
  selectedTransactionWallet: '',
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
    case ADD_DATA:
      return Object.assign({}, state, {name: action.data.name, phone: action.data.phone, email: action.data.email, loggedIn: action.data.loggedIn, selectedWallet: action.data.name})
    default:
      return state
  }
}
