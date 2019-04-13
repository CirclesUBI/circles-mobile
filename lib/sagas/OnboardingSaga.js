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
import { FETCH_CURRENT_COUNTRY, FINISH_ONBOARDING, SAVE_PROFILE_IMAGE, GET_SUGGESTED_CONTACTS } from 'circles-mobile/lib/constants/OnboardingConstants'
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

export function * getSuggestedContacts () {
  while (true) {
    const { allContactPhoneNumbers } = yield take(GET_SUGGESTED_CONTACTS)
    console.log('allContactPhoneNumbers', allContactPhoneNumbers)
    try {
      yield put(showLoadingSpinner())
      // const session = yield Auth.currentSession()
      // const token = session.accessToken.jwtToken
      const apiName = 'users'
      const path = '/contacts'
      const myInit = {
        body: {
          contacts: JSON.stringify(allContactPhoneNumbers)
        },
        headers: {
          'Content-Type': 'application/json',
          accesstoken: 'eyJraWQiOiJEMjg0U2FPODV2aXR0Y0NMc3I5WGIyVW1ySTBVRDF2RmJLNnhwcWFpTmR3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZTdjMmZhNy01ZTE1LTQ5NzYtOTNhMC1jMmM2M2E2NmVlZWEiLCJkZXZpY2Vfa2V5IjoiZXUtY2VudHJhbC0xXzhiMzFlMzU5LWQwMTgtNDg3Yi1hMDk1LTVjNmE4OTlkMmIwMyIsImNvZ25pdG86Z3JvdXBzIjpbImFkbWluIiwidXNlciJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9ocW9vWTRackgiLCJjbGllbnRfaWQiOiIyNWlnZG0zazE1dGcyMG8xbHBqbmRyMmltbyIsImV2ZW50X2lkIjoiMzRjZDAzNzItNWRkYy0xMWU5LTgwOGMtZGIwYjliYjAwZWE5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTU1NTE1MzU5NywiZXhwIjoxNTU1MTU3MTk3LCJpYXQiOjE1NTUxNTM1OTcsImp0aSI6Ijc4NThjNjg0LTEwMTktNDVhZS1iZDhlLTQyMDdjYjgzNjZjOCIsInVzZXJuYW1lIjoidGVzdCJ9.V83vX-eGn0re3AMsyMgwVkSy0ttQiWCBaQKmfnZkJ_vrjpCusKkeIqBypmJA8enZL6csMK5_RYPjHkcVa9h4YFyuJDvTZw8iqRkz-Wa0Ebbsc84FXgaDARoSTt3oXG9BJ_C3c8ktZbpsS63gD3eMxAa3Tr3eC9WhFhP5KA20TYg3SdHuie2bAp5rhLTQ83Gc9Nbt-zRpxOsjgkQX21Skp5aWh4rZULswk6CqqpMw14pMUu5hIdiXrFi3jNO_7mVCFfBye2Lt8eTFqRyUbKCTsBgmpxwF_Fni-Ypqexl64ZHDPC5J06piYjhNY1X13jhZ70VLyMB7Zn5UYP7gMwv3Kw'
        }
      }
      console.log('myInit', myInit)
      let response = yield API.post(apiName, path, myInit)
      // // we don't need to yield here cos the only state change is agreed_to_disclaimer: true
      console.log('response', response)
      // yield put(addDbUserData(response))
      // yield NavigationService.resetFromTo('Main', 'Tabs')
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * finishOnboarding () {
  while (true) {
    const { userCredentials } = yield take(FINISH_ONBOARDING)
    try {
      yield put(showLoadingSpinner())
      // We need to signIn here so that we can get new auth tokens that include the cognito groups
      const signInResponse = yield Auth.signIn(userCredentials.username, userCredentials.password)
      const session = yield Auth.currentSession()
      const token = session.accessToken.jwtToken
      const apiName = 'users'
      const path = ''
      const myInit = {
        body: { 'agreed_to_disclaimer': true },
        headers: {
          accesstoken: token
        }
      }
      let response = yield API.put(apiName, path, myInit)
      // we don't need to yield here cos the only state change is agreed_to_disclaimer: true
      yield put(addDbUserData(response))
      yield NavigationService.resetFromTo('Main', 'Tabs')
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
  yield fork(getSuggestedContacts)
  yield fork(finishOnboarding)
}

export default onboardingSaga
