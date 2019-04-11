import I18n from 'react-native-i18n'
import { CHANGE_LANGUAGE } from 'circles-mobile/lib/constants/SettingsConstants'

import { fork, take } from 'redux-saga/effects'

import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('Settings Saga')

export function * updateLanguage () {
  while (true) {
    const { language } = yield take(CHANGE_LANGUAGE)
    logger.info('updateLanguage: ' + language)
    I18n.locale = language    
  }
}

function * SettingsSaga () {
  yield fork(updateLanguage)
}

export default SettingsSaga
