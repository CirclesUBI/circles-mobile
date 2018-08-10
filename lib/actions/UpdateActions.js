import { TRANSACTION_RECEIVED, TRANSACTION_SENT, NOTIFICATION_RECEIVED } from 'circles-mobile/lib/constants/UpdateConstants'

export function transactionReceived (timestamp, value, counterparty) {
  return {
    type: TRANSACTION_RECEIVED,
    timestamp,
    value,
    counterparty
  }
}

export function transactionSent (timestamp, value, counterparty) {
  return {
    type: TRANSACTION_SENT,
    timestamp,
    value,
    counterparty
  }
}

export function notificationReceived (notificationObj) {
  return {
    type: NOTIFICATION_RECEIVED,
    notificationObj
  }
}
