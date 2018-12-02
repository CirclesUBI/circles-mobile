// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_DATA } from 'circles-mobile/lib/constants/OnboardingConstants'
import { ADD_USER_DATA } from 'circles-mobile/lib/constants/AuthConstants'

let initialState = {
  address: '0x',
  isSignedIn: false,
  name: '',
  picture: '',
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
      return Object.assign({}, state, {
        name: action.data.name,
        phone: action.data.phone,
        email: action.data.email,
        picture: action.data.picture,
        isSignedIn: action.data.isSignedIn,
        selectedWallet: action.data.name
      })
    case ADD_USER_DATA:
      return Object.assign({}, state, {
        name: action.userDetails.name,
        phone: action.userDetails.phone_number,
        email: action.userDetails.email,
        picture: { uri: action.userDetails.picture },
        isSignedIn: action.userDetails.isSignedIn,
        selectedWallet: action.userDetails.name
      })
    default:
      return state
  }
}
