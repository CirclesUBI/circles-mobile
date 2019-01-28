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

<<<<<<< HEAD
export function getNotifications (entity) {
=======
export function getNotification (entity) {
>>>>>>> create actions and constants for api routes
  return {
    type: GET_NOTIFICATIONS,
    entity
  }
}

<<<<<<< HEAD
export function notificationReceived (notification) {
=======
export function notificationReceived (notificationObj) {
>>>>>>> create actions and constants for api routes
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

export function notificationsReceived (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}
