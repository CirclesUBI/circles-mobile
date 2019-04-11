import { CHANGE_LANGUAGE } from 'circles-mobile/lib/constants/SettingsConstants'

export function changeLanguage (language) {
  console.log('changeLanguage action')
  return {
    type: CHANGE_LANGUAGE,
    language
  }
}
