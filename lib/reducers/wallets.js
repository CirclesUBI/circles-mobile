import { WALLET_ADDED, SEND_PAYMENT } from 'circles-mobile/lib/constants/WalletConstants'

let initialState = {
  'Ashoka Finley': {
    balance: 10000,
    type: 'primary'
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
  switch (action.type) {
    case WALLET_ADDED:
      return Object.assign({}, state, action.newWallet)
    case SEND_PAYMENT:
      let newBal = Object.assign({}, initialState[action.from], {balance: initialState[action.from].balance - action.value})
      return Object.assign({}, state, {[action.from]: newBal})
    default:
      return state
  }
}
