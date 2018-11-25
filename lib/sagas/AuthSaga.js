// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { takeEvery, put, all } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import { addData, verifyUser } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGN_IN, SIGN_OUT } from 'circles-mobile/lib/constants/AuthConstants'
import { VERIFY_USER } from '../constants/OnboardingConstants'

export function * signIn (action) {
  try {
    let response = yield Auth.signIn(action.signInDetails.phone, action.signInDetails.password)
    if (response.constructor.name === 'CognitoUser') {
      // api call here
      yield put(addData({name: action.signInDetails.name, phone: action.signInDetails.phone, email: action.signInDetails.email, isSignedIn: true}))
      NavigationService.resetFromTo('Main', 'Tabs')
    }
  } catch (err) {
    if (err.code === 'UserNotConfirmedException') {
      console.log(err)
      yield put(verifyUser('unconfirmed'))
    }
  }
}

export function * signOut (action) {
  console.log('confirmSignup', action)
  try {
    let response = yield Auth.confirmSignUp(action.confirmsignInDetails.phone, action.confirmsignInDetails.code)
    console.log('confirm signUp response', response)
    if (response === 'SUCCESS') {
      yield put(verifyUser('verified'))
      yield put(addData({isSignedIn: true}))
    }
  } catch (err) {
    if (err.code === 'CodeMismatchException') yield put(verifyUser('incorrect'))
    console.error(err)
  }
}

function * authSaga () {
  yield all([
    takeEvery(VERIFY_USER, verifyUser),
    takeEvery(SIGN_IN, signIn),
    takeEvery(SIGN_OUT, signOut)
  ])
}

export default authSaga
