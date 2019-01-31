import { NOTIFICATIONS_RECEIVED } from 'circles-mobile/lib/constants/UpdateConstants'

let initialState = {
  notifications: []
}

export default function updateReducer (state = initialState, action) {
  switch (action.type) {
    case NOTIFICATIONS_RECEIVED:
      return Object.assign({}, state, { notifications: state.notifications.concat(action.notifications) })
    default:
      return state
  }
}
