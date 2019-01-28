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

export function getUser (userObj) {
  return {
    type: GET_USER,
    userObj
  }
}

export function userReceived (userObj) {
  return {
    type: USER_RECEIVED,
    userObj
  }
}

export function getUsers () {
  return {
    type: GET_USERS
  }
}

export function usersReceived (userArr) {
  return {
    type: USERS_RECEIVED,
    userArr
  }
}

export function addUser (userObj) {
  return {
    type: ADD_USER,
    userObj
  }
}

export function userAdded (userObj) {
  return {
    type: USER_ADDED,
    userObj
  }
}

export function deleteUser (userObj) {
  return {
    type: DELETE_USER,
    userObj
  }
}

export function userDeleted (userObj) {
  return {
    type: USER_DELETED,
    userObj
  }
}
