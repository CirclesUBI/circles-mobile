import { WALLET_ADDED, SEND_PAYMENT, REQUEST_PAYMENT } from 'circles-mobile/lib/constants/WalletConstants'
import { TRANSACTION_RECEIVED, TRANSACTION_SENT, NOTIFICATION_RECEIVED } from 'circles-mobile/lib/constants/UpdateConstants'
import { ADD_DATA } from '../constants/OnboardingConstants'

let initialState = {
  // 'Ashoka Finley': {
  //   balance: 0,
  //   primary: true,
  //   transactions: [
  //     // {
  //     //   timestamp: 683030,
  //     //   value: 10,
  //     //   counterparty: 'Saraswathi Subbaraman',
  //     //   type: 'received'
  //     // },
  //   ],
  //   notifications: [
  //     // {
  //     //   type: 'Issuance',
  //     //   value: 1000,
  //     //   first: false
  //     // },
  //   ]
  // },
  // 'Knitted Socks Org': {
  //   balance: 20000,
  //   transactions: [],
  //   notifications: [],
  //   admins: {
  //     '0x': {
  //       name: 'Blah Blah'
  //     }
  //   },
  //   service: {}
  // },
  // 'Anarchy in the USA': {
  //   balance: 10000,
  //   transactions: [],
  //   notifications: [],
  //   admins: {},
  //   service: {}
  // }
}

// {
//   timestamp: 6893200,
//   value: 100,
//   counterparty: 'Ed Zillion',
//   type: 'sent'
// }

export default function walletReducer (state = initialState, action) {
  let newBal, newTxs
  switch (action.type) {
    case WALLET_ADDED:
      return Object.assign({}, state, action.newWallet)
    case SEND_PAYMENT:
      newTxs = state[action.from].transactions
      newTxs.push({type: 'payment', timestamp: action.timestamp, amount: parseInt(action.value), source: action.to})
      newBal = Object.assign({}, state[action.from], {balance: state[action.from].balance - parseInt(action.value)})
      return Object.assign({}, state, {[action.from]: newBal})
    case REQUEST_PAYMENT:
      newTxs = state[action.from].transactions
      newTxs.push({type: 'request', timestamp: action.timestamp, amount: parseInt(action.value), source: action.to})
      newBal = Object.assign({}, state[action.from], {balance: state[action.from].balance + parseInt(action.value)})
      return Object.assign({}, state, {[action.from]: newBal})
    case ADD_DATA:
      return Object.assign({}, state, {[action.data.name]: {
        balance: 0,
        primary: true,
        transactions: [],
        notifications: []
      }})
      // return state
    // case TRANSACTION_RECEIVED:
    //   state[action..transactions.received.push({timestamp: action.timestamp, value: action.value, counterparty: action.counterparty})
    //   newTxs = Object.assign({}, state.transactions, {received: state.transactions.received})
    //   return Object.assign({}, state, {transactions: newTxs})
    // case TRANSACTION_SENT:
    //   state.transactions.sent.push({timestamp: action.timestamp, value: action.value, counterparty: action.counterparty})
    //   newTxs = Object.assign({}, state.transactions, {sent: state.transactions.sent})
    //   return Object.assign({}, state, {transactions: newTxs})
    // case NOTIFICATION_RECEIVED:
    //   state.notifications.push(action.notificationObj)
    //   return Object.assign({}, state, {notifications: state.notifications})
    default:
      return state
  }
}
