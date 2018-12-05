// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { call, takeEvery, put, all } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

// import { addUserData } from 'circles-mobile/lib/actions/AuthActions'
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGN_IN, SIGN_OUT, SIGN_UP, CONFIRM_SIGN_UP } from 'circles-mobile/lib/constants/AuthConstants'

import { Constants } from 'expo'

export function * signIn (action) {
  console.log('AuthSaga signIn', action)
  try {
    let response = yield call(Auth.signIn, action.signInDetails.username, action.signInDetails.password)
    if (response.constructor.name === 'CognitoUser') {
      // api call here ?
      let user = yield Auth.currentUserInfo()
      // yield put(addUserData(user.attributes))
      let userData = {
        name: user.attributes.name,
        email: user.attributes.email,
        phone: user.attributes.phone_number,
        picture: {uri: user.attributes.picture},
        isSignedIn: true
      }
      yield put(addData(userData))
      NavigationService.resetFromTo('Main', 'Tabs')
    }
  } catch (err) {
    console.log(err)
  }
}

export function * signOut () {
  console.log('AuthSaga signOut')
  try {
    yield Auth.signOut()
    yield put(addData({isSignedIn: false}))
    NavigationService.resetFromTo('Main', 'Main')
  } catch (err) {
    console.log(err)
  }
}

export function * signUpOld (action) {
  console.log('action', action)
  try {
    let response = yield Auth.signUp({
      username: action.signUpDetails.phone,
      password: action.signUpDetails.password,
      attributes: {
        email: action.signUpDetails.email,
        name: action.signUpDetails.name,
        phone_number: action.signUpDetails.phone,
        picture: action.signUpDetails.picture,
        'custom:deviceId': Constants.deviceId
      }
    })
    console.log('signUp response', response)
    yield put(addData({name: action.signUpDetails.name, phone: action.signUpDetails.phone, email: action.signUpDetails.email}))    
  } catch (err) {
    console.log('er', err)
    throw new Error(err)
  }
}

export function * signUp (action) {
  console.log('signUp', action)
  return Auth.signIn(action.signInDetails.username, action.signInDetails.password)
    .then(response => ({ response }))
    .catch(error => ({ error }))
  // try {
  //   let response = yield Auth.signUp({
  //     username: action.signUpDetails.phone,
  //     password: action.signUpDetails.password,
  //     attributes: {
  //       email: action.signUpDetails.email,
  //       name: action.signUpDetails.name,
  //       phone_number: action.signUpDetails.phone,
  //       picture: action.signUpDetails.picture,
  //       'custom:deviceId': Constants.deviceId
  //     }
  //   })
  //   console.log('signUp response', response)
  //   yield put(addData({name: action.signUpDetails.name, phone: action.signUpDetails.phone, email: action.signUpDetails.email}))    
  // } catch (err) {
  //   console.log('er', err)
  //   throw new Error(err)
  // }
}

export function * confirmSignup (action) {
  console.log('confirmSignup', action)
  try {
    let response = yield Auth.confirmSignUp(action.confirmsignUpDetails.phone, action.confirmsignUpDetails.code)
    console.log('confirm signUp response', response)
    return response
  } catch (err) {
    throw (err)
  }
}

function * authSaga () {
  yield all([
    takeEvery(SIGN_IN, signIn),
    takeEvery(SIGN_OUT, signOut),
    takeEvery(SIGN_UP, signUp),
    takeEvery(CONFIRM_SIGN_UP, confirmSignup)
  ])
}

export default authSaga
