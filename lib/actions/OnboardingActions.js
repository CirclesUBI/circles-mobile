import { ADD_ONBOARDING_DATA, FETCH_CURRENT_COUNTRY, FINISH_ONBOARDING, SAVE_PROFILE_IMAGE, SET_VERIFICATION_STATE, WIPE_ONBOARDING_DATA, CREATE_CIRCLES_PERSON } from '../constants/OnboardingConstants'

export function addOnboardingData (data) {
  return {
    type: ADD_ONBOARDING_DATA,
    data
  }
}

export function wipeOnboardingData () {
  return {
    type: WIPE_ONBOARDING_DATA
  }
}

export function fetchCurrentCountry () {
  return {
    type: FETCH_CURRENT_COUNTRY
  }
}

export function finishOnboarding () {
  return {
    type: FINISH_ONBOARDING
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
