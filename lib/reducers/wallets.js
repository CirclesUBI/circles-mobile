import { WALLET_ADDED, SEND_PAYMENT, REQUEST_PAYMENT } from 'circles-mobile/lib/constants/WalletConstants'

let initialState = {
  'Ashoka Finley': {
    balance: 10000,
    primary: true
  },
  'Knitted Socks Org': {
    balance: 20000,
    admins: {
      '0x': {
        name: 'Blah Blah'
      }
    },
    service: {}
  },
  'Anarchy in the USA': {
    balance: 10000,
    admins: {},
    service: {}
  }
}

export default function walletReducer (state = initialState, action) {
  let newBal
  switch (action.type) {
    case WALLET_ADDED:
      return Object.assign({}, state, action.newWallet)
    case SEND_PAYMENT:
      newBal = Object.assign({}, initialState[action.from], {balance: initialState[action.from].balance - parseInt(action.value)})
      return Object.assign({}, state, {[action.from]: newBal})
    case REQUEST_PAYMENT:
      newBal = Object.assign({}, initialState[action.from], {balance: initialState[action.from].balance + parseInt(action.value)})
      return Object.assign({}, state, {[action.from]: newBal})
    default:
      return state
  }
}
