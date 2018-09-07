import { ADD_DATA, FETCH_CURRENT_COUNTRY, ADD_IMAGE_ONBOARDING } from '../constants/OnboardingConstants'

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
