// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_COGNITO_USER_DATA } from 'circles-mobile/lib/constants/AuthConstants'

let initialState = {
  address: '0x',
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
    case ADD_COGNITO_USER_DATA:
      return Object.assign({}, state, {
        name: action.cognitoUser.attributes.name,
        phone: action.cognitoUser.attributes.phone_number,
        email: action.cognitoUser.attributes.email,
        picture: { uri: action.cognitoUser.attributes.picture },
        selectedWallet: action.cognitoUser.attributes.name
      })
    default:
      return state
  }
}
