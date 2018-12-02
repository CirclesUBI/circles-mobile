import { ADD_USER_DATA, SIGN_IN, SIGN_OUT } from 'circles-mobile/lib/constants/AuthConstants'

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
