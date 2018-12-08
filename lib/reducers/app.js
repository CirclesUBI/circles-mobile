import { DISMISS_CONTACT_SUGGESTION, SHOW_LOADING_SPINNER, HIDE_LOADING_SPINNER, SET_AUTH_STATE } from 'circles-mobile/lib/constants/AppConstants'

let initialState = {
  contactSuggestion: true,
  isLoading: false,
  authState: 'unauthorized'
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case DISMISS_CONTACT_SUGGESTION:
      return Object.assign({}, state, {contactSuggestion: false})
    case SHOW_LOADING_SPINNER:
      return Object.assign({}, state, {isLoading: true})
    case HIDE_LOADING_SPINNER:
      return Object.assign({}, state, {isLoading: false})
    case SET_AUTH_STATE:
      return Object.assign({}, state, action.authState)
    default:
      return state
  }
}
