import { TRANSACTION_RECEIVED, TRANSACTION_SENT, GET_NOTIFICATIONS, NOTIFICATION_RECEIVED, NOTIFICATIONS_RECEIVED } from 'circles-mobile/lib/constants/UpdateConstants'

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

export function getNotifications (entity) {
  return {
    type: GET_NOTIFICATIONS,
    entity
  }
}

export function notificationReceived (notification) {
  return {
    type: NOTIFICATION_RECEIVED,
    notification
  }
}

export function notificationsReceived (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}
