import { CHANGE_LANGUAGE } from 'circles-mobile/lib/constants/SettingsConstants'

export function changeLanguage (language) {  
  return {
    type: CHANGE_LANGUAGE,
    language
  }
}
