import { TRANSACTION_RECEIVED, TRANSACTION_SENT, NOTIFICATION_RECEIVED } from 'circles-mobile/lib/constants/UpdateConstants'

let initialState = {
  transactions: [
    {
      timestamp: 683030,
      value: 10,
      counterparty: 'Saraswathi Subbaraman',
      type: 'received'
    },
    {
      timestamp: 6893200,
      value: 100,
      counterparty: 'Ed Zillion',
      type: 'sent'
    }
  ],
  notifications: [
    {
      type: 'Issuance',
      value: 1000,
      first: false
    },
    {
      type: 'Issuance',
      value: 500,
      first: true
    }
  ]
}

export default function inventoryReducer (state = initialState, action) {
  let newTransactions
  switch (action.type) {
    case TRANSACTION_RECEIVED:
      state.transactions.received.push({timestamp: action.timestamp, value: action.value, counterparty: action.counterparty})
      newTransactions = Object.assign({}, state.transactions, {received: state.transactions.received})
      return Object.assign({}, state, {transactions: newTransactions})
    case TRANSACTION_SENT:
      state.transactions.sent.push({timestamp: action.timestamp, value: action.value, counterparty: action.counterparty})
      newTransactions = Object.assign({}, state.transactions, {sent: state.transactions.sent})
      return Object.assign({}, state, {transactions: newTransactions})
    case NOTIFICATION_RECEIVED:
      state.notifications.push(action.notificationObj)
      return Object.assign({}, state, {notifications: state.notifications})
    default:
      return state
  }
}
