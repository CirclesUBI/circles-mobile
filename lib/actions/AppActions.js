import { DISMISS_CONTACT_SUGGESTION, SHOW_LOADING_SPINNER, HIDE_LOADING_SPINNER } from 'circles-mobile/lib/constants/AppConstants'

export function dismissedContact () {
  return {
    type: DISMISS_CONTACT_SUGGESTION
  }
}

export function showLoadingSpinner () {
  console.log('loading')
  return {
    type: SHOW_LOADING_SPINNER
  }
}

export function hideLoadingSpinner () {
  return {
    type: HIDE_LOADING_SPINNER
  }
}
