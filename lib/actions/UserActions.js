import { GET_USER, USER_RECEIVED, GET_USERS, USERS_RECEIVED, ADD_USER, USER_ADDED, DELETE_USER, USER_DELETED } from 'circles-mobile/lib/constants/UserConstants'

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
  }
}

export function getUsers () {
  return {
    type: GET_USERS
  }
}

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
  }
}
