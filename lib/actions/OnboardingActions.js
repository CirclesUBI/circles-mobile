import { ADD_DATA, FETCH_CURRENT_COUNTRY, SAVE_PROFILE_IMAGE, INIT_SIGN_UP, INIT_CONFIRM_SIGN_UP, VERIFY_USER } from '../constants/OnboardingConstants'

export function addData (data) {
  return {
    type: ADD_DATA,
    data
  }
}

export function fetchCurrentCountry () {
  return {
    type: FETCH_CURRENT_COUNTRY
  }
}

export function saveProfileImage (avatarObj) {
  return {
    type: SAVE_PROFILE_IMAGE,
    avatarObj
  }
}

export function verifyUser (verificationState) {
  return {
    type: VERIFY_USER,
    verificationState
  }
}

export function initSignUp (signUpObject) {
  return {
    type: INIT_SIGN_UP,
    signUpObject
  }
}

export function initConfirmSignUp (confirmSignUpObject) {
  return {
    type: INIT_CONFIRM_SIGN_UP,
    confirmSignUpObject
  }
}
