import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, GET_USER, USER_RECEIVED, GET_USERS, USERS_RECEIVED, ADD_USER, USER_ADDED, DELETE_USER, USER_DELETED } from 'circles-mobile/lib/constants/UserConstants'

export function walletSelect (wallet) {
  return {
    type: WALLET_SELECTED,
    wallet
  }
}

export function selectedTransactionWallet (wallet) {
  return {
    type: TRANSACTION_WALLET_SELECTED,
    wallet
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
export function getUser (user) {
  return {
    type: GET_USER,
    user
  }
}

export function userReceived (user) {
  return {
    type: USER_RECEIVED,
    user
=======
export function getUser (userObj) {
=======
export function getUser (user) {
>>>>>>> create sagas for Organization, Update, User
  return {
    type: GET_USER,
    user
  }
}

export function userReceived (user) {
  return {
    type: USER_RECEIVED,
<<<<<<< HEAD
    userObj
>>>>>>> create actions and constants for api routes
=======
    user
>>>>>>> create sagas for Organization, Update, User
  }
}

export function getUsers () {
  return {
    type: GET_USERS
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
export function usersReceived (usersArr) {
  return {
    type: USERS_RECEIVED,
    usersArr
  }
}

export function addUser (user) {
  return {
    type: ADD_USER,
    user
  }
}

export function userAdded (user) {
  return {
    type: USER_ADDED,
    user
  }
}

export function deleteUser (user) {
  return {
    type: DELETE_USER,
    user
  }
}

export function userDeleted (user) {
  return {
    type: USER_DELETED,
    user
=======
export function usersReceived (userArr) {
=======
export function usersReceived (usersArr) {
>>>>>>> create sagas for Organization, Update, User
  return {
    type: USERS_RECEIVED,
    usersArr
  }
}

export function addUser (user) {
  return {
    type: ADD_USER,
    user
  }
}

export function userAdded (user) {
  return {
    type: USER_ADDED,
    user
  }
}

export function deleteUser (user) {
  return {
    type: DELETE_USER,
    user
  }
}

export function userDeleted (user) {
  return {
    type: USER_DELETED,
<<<<<<< HEAD
    userObj
>>>>>>> create actions and constants for api routes
=======
    user
>>>>>>> create sagas for Organization, Update, User
  }
}
