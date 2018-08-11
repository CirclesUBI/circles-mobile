import { DISMISS_CONTACT_SUGGESTION } from 'circles-mobile/lib/constants/AppConstants'

export function dismissedContact () {
  return {
    type: DISMISS_CONTACT_SUGGESTION
  }
}
