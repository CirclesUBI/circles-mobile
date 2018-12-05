import { ADD_USER_DATA, SIGN_IN, SIGN_OUT, SIGN_UP, CONFIRM_SIGN_UP } from 'circles-mobile/lib/constants/AuthConstants'

export function addUserData (userDetails) {
  return {
    type: ADD_USER_DATA,
    userDetails
  }
}

export function signIn (signInDetails) {
  return {
    type: SIGN_IN,
    signInDetails
  }
}

export function signOut () {
  return {
    type: SIGN_OUT
  }
}

export function signUp (signUpDetails) {
  return {
    type: SIGN_UP,
    signUpDetails
  }
}

export function confirmSignUp (confirmsignUpDetails) {
  return {
    type: CONFIRM_SIGN_UP,
    confirmsignUpDetails
  }
}
