// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_DATA } from '../constants/OnboardingConstants'

let initialState = {
  address: '0x',
  isSignedIn: false,
  name: '',
  phone: '',
  email: '',
  selectedWallet: '',
  selectedTransactionWallet: ''
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_WALLET_SELECTED:
      return Object.assign({}, state, {selectedTransactionWallet: action.wallet})
    case WALLET_SELECTED:
      return Object.assign({}, state, {selectedWallet: action.wallet})
    case ADD_DATA:
      return Object.assign({}, state, {name: action.data.name, phone: action.data.phone, email: action.data.email, isSignedIn: action.data.isSignedIn, selectedWallet: action.data.name})
    default:
      return state
  }
}
