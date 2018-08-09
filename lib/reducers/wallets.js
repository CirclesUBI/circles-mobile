import { WALLET_ADDED } from 'circles-mobile/lib/constants/WalletConstants'

let initialState = {
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
    default:
      return state
  }
}
