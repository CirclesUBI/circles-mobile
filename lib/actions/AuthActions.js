import { ADD_COGNITO_USER_DATA, SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, SIGNIN_CONFIRM_REQUEST } from 'circles-mobile/lib/constants/AuthConstants'

export function addCognitoUserData (cognitoUser) {
  return {
    type: ADD_COGNITO_USER_DATA,
    cognitoUser
  }
}

export function initSignIn (data) {
  return {
    type: SIGNIN_REQUEST,
    data
  }
}

export function confirmSignIn (code) {
  return {
    type: SIGNIN_CONFIRM_REQUEST,
    code
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
