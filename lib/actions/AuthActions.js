import { GET_OR_ADD_USER_REQUEST, ADD_DB_USER_DATA, SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST } from 'circles-mobile/lib/constants/AuthConstants'

export function addDbUserData (dbUser) {
  return {
    type: ADD_DB_USER_DATA,
    dbUser
  }
}

export function initCreateUser (cognitoUser) {
  return {
    type: GET_OR_ADD_USER_REQUEST,
    cognitoUser
  }
}

export function initSignIn (data) {
  return {
    type: SIGNIN_REQUEST,
    data
  }
}

export function signOut () {
  return {
    type: SIGNOUT_REQUEST
  }
}

export function initSignUp (data) {
  return {
    type: SIGNUP_REQUEST,
    data
  }
}

export function confirmSignUp (data) {
  return {
    type: SIGNUP_CONFIRM_REQUEST,
    data
  }
}
