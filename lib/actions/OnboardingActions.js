import { ADD_DATA, FETCH_CURRENT_COUNTRY, SAVE_PROFILE_IMAGE, SET_VERIFICATION_STATE } from '../constants/OnboardingConstants'

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

export function setVerificationState (verificationState) {
  return {
    type: SET_VERIFICATION_STATE,
    verificationState
  }
}
