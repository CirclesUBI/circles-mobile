// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { call, put, take, all, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import Storage from '@aws-amplify/storage'
import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { ConsoleLogger } from '@aws-amplify/core'

import { ImageManipulator } from 'expo'

import mime from 'react-native-mime-types'

import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
import { addDbUserData } from 'circles-mobile/lib/actions/AuthActions'
import { FETCH_CURRENT_COUNTRY, FINISH_ONBOARDING, SAVE_PROFILE_IMAGE, CREATE_CIRCLES_PERSON } from 'circles-mobile/lib/constants/OnboardingConstants'
import { hideLoadingSpinner, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'

const logger = new ConsoleLogger('Onboarding Saga')

// const NISABA_ROUTE = 'https://nisaba.uport.me'
// export const VERIFICATION_ROUTE = NISABA_ROUTE + '/api/v2/verify'
// export const CODE_VERIFICATION_ROUTE = VERIFICATION_ROUTE + '/check'
// export const REQUEST_PHONECALL_ROUTE = VERIFICATION_ROUTE + '/next'

export function * saveProfileImage () {
  while (true) {
    let putResponse, getResponse, manipResult
    const action = yield take(SAVE_PROFILE_IMAGE)
    try {
      yield put(showLoadingSpinner())
      let filename = action.avatarObj.uri.split('/').pop()
      let contentType = mime.contentType(filename)
      let format = contentType.split('/')[1]

      let edits = [{flip: { horizontal: true }}, {resize: { width: 750, height: 1000 }}]
      let saveOptions = {format: format, base64: true}
      manipResult = yield ImageManipulator.manipulateAsync(action.avatarObj.uri, edits, saveOptions)

      filename = manipResult.uri.split('/').pop()
      contentType = mime.contentType(filename)

      const bufferedImageData = Buffer.from(manipResult.base64, 'base64')
      const options = {
        level: 'public',
        contentType: contentType,
        ContentEncoding: 'base64'
      }

      putResponse = yield Storage.put(filename, bufferedImageData, options)
      getResponse = yield Storage.get(filename)
      // we want to update the uri so it points to the online version
      delete manipResult.base64
      manipResult.uri = getResponse
      console.log(manipResult)

      yield put(addData({picture: manipResult}))
    } catch (err) {
      logger.error({ manipResult })
      logger.error({ putResponse })
      logger.error({ getResponse })
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * fetchCurrentCountry () {
  yield take(FETCH_CURRENT_COUNTRY)
  const isConnected = true
  if (!isConnected) return false
  try {
    const response = yield call(fetch, 'https://ipinfo.io', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    const responseJson = yield call(response.json.bind(response))
    yield put(addData({country: responseJson.country}))
    return true
  } catch (err) {
    logger.error(err)
  }
}

export function * finishOnboarding () {
  while (true) {
    yield take(FINISH_ONBOARDING)
    try {
      yield put(showLoadingSpinner())
      const session = yield Auth.currentSession()   
      const token = session.accessToken.jwtToken   
      const myInit = {
        body: {"agreed_to_disclaimer": true},
        headers: {
          accesstoken: token
        }        
      }
      let response = yield API.put('users', '/', myInit)
      // we don't need to yield here cos the only state change is agreed_to_disclaimer: true
      put(addDbUserData(response))
      NavigationService.resetFromTo('Main', 'Tabs')
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

function * onboardingSaga () {
  yield fork(saveProfileImage)
  yield fork(fetchCurrentCountry)
  yield fork(finishOnboarding)
}

export default onboardingSaga
