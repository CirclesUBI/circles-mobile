import { AUTHORIZE_CAMERA, AUTHORIZE_PHOTOS, AUTHORIZE_NOTIFICATIONS } from 'circles-mobile/lib/constants/AuthorizationConstants'

export function authorizeCamera (status) {
  return {
    type: AUTHORIZE_CAMERA,
    status
  }
}

export function authorizePhotos (status) {
  return {
    type: AUTHORIZE_PHOTOS,
    status
  }
}

export function authorizeNotifications (status) {
  return {
    type: AUTHORIZE_NOTIFICATIONS,
    status
  }
}
