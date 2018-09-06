import { AUTHORIZE_CAMERA, AUTHORIZE_PHOTOS, AUTHORIZE_NOTIFICATIONS } from 'circles-mobile/lib/constants/AuthorizationConstants'

const initialState = {
  cameraAuthorized: 'undetermined',
  photoAuthorized: 'undetermined',
  notificationsAuthorized: 'undetermined'
}

function authorizationReducer (state = initialState, action) {
  switch (action.type) {
    case AUTHORIZE_CAMERA:
      return { ...state, cameraAuthorized: action.status }
    case AUTHORIZE_PHOTOS:
      return { ...state, photoAuthorized: action.status }
    case AUTHORIZE_NOTIFICATIONS:
      return { ...state, notificationsAuthorized: action.status }
    default:
      return state
  }
}

export default authorizationReducer
