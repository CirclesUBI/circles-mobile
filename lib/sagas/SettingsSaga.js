import {setLanguage} from 'redux-i18n'
import { CHANGE_LANGUAGE } from 'circles-mobile/lib/constants/SettingsConstants'

import { put, fork, take } from 'redux-saga/effects'

import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('Settings Saga')

export function * changeLanguage () {
  while (true) {
    const { language } = yield take(CHANGE_LANGUAGE)
    logger.info('updateLanguage: ' + language)
    try {
      yield put(setLanguage(language))
    } catch (err) {
      console.error(err)
    }
  }
}

function * SettingsSaga () {
  yield fork(changeLanguage)
}

export default SettingsSaga
