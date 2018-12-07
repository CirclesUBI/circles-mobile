// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { call, fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

// import { addUserData } from 'circles-mobile/lib/actions/AuthActions'
import { addData, verifyUser } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, SIGNIN_CONFIRM_REQUEST } from 'circles-mobile/lib/constants/AuthConstants'

import { Constants } from 'expo'

export function * initSignIn () {
  while (true) {
    const action = yield take(SIGNIN_REQUEST)
    const {phone, password} = action.data // Cognito is set to accept phonenumbers as usernames

    try {
      const response = yield Auth.signIn(phone, password)
      if (response.constructor.name === 'CognitoUser') {
        // api call here ?
        const user = yield Auth.currentUserInfo()
        // yield put(addUserData(user.attributes))
        const userData = {
          name: user.attributes.name,
          email: user.attributes.email,
          phone: user.attributes.phone_number,
          picture: {uri: user.attributes.picture},
          isSignedIn: true
        }
        yield put(addData(userData))
        NavigationService.resetFromTo('Main', 'Tabs')
      } else throw new Error('Auth.signIn has not returned a user')
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        yield put(verifyUser('unconfirmed'))
        // redirect to VerifyPhoneScreen here?        
      } else {
        console.error(err)
      }
    }
  }
}

export function * confirmSignIn () {
  while (true) {
    const action = yield take(SIGNIN_CONFIRM_REQUEST)
    try {
      const response = yield Auth.confirmSignIn(action.code)
      console.log(response)
      const user = yield Auth.currentUserInfo()
      // yield put(addUserData(user.attributes))
      const userData = {
        name: user.attributes.name,
        email: user.attributes.email,
        phone: user.attributes.phone_number,
        picture: {uri: user.attributes.picture},
        isSignedIn: true
      }
      yield put(addData(userData))
      NavigationService.resetFromTo('Main', 'Tabs')
    } catch (err) {
      console.error(err)
    }
  }
}

export function * signOut () {
  while (true) {
    yield take(SIGNOUT_REQUEST)
    try {
      yield call(Auth.signOut)
      yield put(addData({isSignedIn: false}))
      NavigationService.resetFromTo('Main', 'Main')
    } catch (err) {
      console.log(err)
    }
  }
}

export function * initSignUp () {
  while (true) {
    const action = yield take(SIGNUP_REQUEST)
    const {email, name, password, phone, picture} = action.data
    try {
      let response = yield Auth.signUp({
        username: phone, // Cognito is set to accept phonenumbers as usernames
        password: password,
        attributes: {
          email: email,
          name: name,
          phone_number: phone,
          picture: picture,
          'custom:deviceId': Constants.deviceId // for push notifications
        }
      })
      console.log('initSignUp response', response)
      // if (response) yield put({ type: 'SIGN_UP_SUCCESS', response })
      // else yield put({ type: 'SIGN_UP_FAIL', error, action })
    } catch (err) {
      if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's try to log them in
          yield put({ type: 'SIGNIN_REQUEST', data: action.data })
        } catch (err) {
          // they still have yet to confirm
          if (err.code === 'UserNotConfirmedException') {
            yield put(verifyUser('unconfirmed'))
          } else {
            console.error(err)
          }
        }
      } else {
        console.error(err)
      }
    }
  }
}

export function * confirmSignUp () {
  while (true) {
    const action = yield take(SIGNUP_CONFIRM_REQUEST)
    const {phone, code} = action.data

    try {
      const response = yield Auth.confirmSignUp(phone, code)
      console.log('confirm', response)
      yield put(verifyUser('verified'))
    } catch (err) {
      if (err.code === 'CodeMismatchException') yield put(verifyUser('incorrect'))
      else if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's try to log them in
          yield put({ type: 'SIGNIN_REQUEST', action })
        } catch (err) {
          console.error(err)
        }
      } else {
        console.err(err)
      }
    }
  }
}

function * authSaga () {
  yield fork(initSignIn)
  yield fork(confirmSignIn)
  yield fork(initSignUp)
  yield fork(confirmSignUp)
  yield fork(signOut)
}

export default authSaga
