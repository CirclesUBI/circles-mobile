import { ADD_DATA, FETCH_CURRENT_COUNTRY, ADD_IMAGE_ONBOARDING, SIGN_UP, CONFIRM_SIGN_UP, VERIFY_USER } from '../constants/OnboardingConstants'

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

export function addImageOnboarding (avatarObj) {
  return {
    type: ADD_IMAGE_ONBOARDING,
    avatarObj
  }
}

export function signUp (loginDetails) {
  return {
    type: SIGN_UP,
    loginDetails
  }
}

export function confirmSignUp (confirmLoginDetails) {
  return {
    type: CONFIRM_SIGN_UP,
    confirmLoginDetails
  }
}

export function verifyUser (verificationState) {
  return {
    type: VERIFY_USER,
    verificationState
  }
}
