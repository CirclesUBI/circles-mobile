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
<<<<<<< HEAD
export function getNotifications (entity) {
=======
export function getNotification (entity) {
>>>>>>> create actions and constants for api routes
=======
export function getNotifications (entity) {
>>>>>>> create sagas for Organization, Update, User
  return {
    type: GET_NOTIFICATIONS,
    entity
  }
}

<<<<<<< HEAD
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
=======
export function notificationReceived (notification) {
  return {
    type: NOTIFICATION_RECEIVED,
    notification
>>>>>>> Update route for wallet creation
  }
}

export function notificationsReceived (notifications) {
  return {
    type: NOTIFICATIONS_RECEIVED,
    notifications
  }
}
