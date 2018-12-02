import { ADD_DATA, FETCH_CURRENT_COUNTRY, SAVE_PROFILE_IMAGE, SIGN_UP, CONFIRM_SIGN_UP, VERIFY_USER } from '../constants/OnboardingConstants'

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

export function verifyUser (verificationState) {
  return {
    type: VERIFY_USER,
    verificationState
  }
}
