import { CHANGE_LANGUAGE } from 'circles-mobile/lib/constants/SettingsConstants'
import I18n from 'redux-i18n'

let initialState = {
  language:  'de' // I18n.locale.substr(0, 2)
}

export default function settingsReducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:  
      return Object.assign({}, state, {language: action.data})
    default:
      return state
  }
}
