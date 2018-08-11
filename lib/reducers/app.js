import { DISMISS_CONTACT_SUGGESTION } from 'circles-mobile/lib/constants/AppConstants'

let initialState = {
  contactSuggestion: true
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case DISMISS_CONTACT_SUGGESTION:
      return Object.assign({}, state, {contactSuggestion: false})
    default:
      return state
  }
}
