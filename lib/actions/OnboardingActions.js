import { ADD_DATA, FETCH_CURRENT_COUNTRY } from '../constants/OnboardingActionTypes'

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
