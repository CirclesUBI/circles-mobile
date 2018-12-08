// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { select, fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import { hideLoadingSpinner, setAuthState, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { wipeOnboardingData, setVerificationState } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, SIGNIN_CONFIRM_REQUEST } from 'circles-mobile/lib/constants/AuthConstants'
import { addCognitoUserData } from 'circles-mobile/lib/actions/AuthActions'

import { Constants } from 'expo'

export function * initSignIn () {
  while (true) {
    const action = yield take(SIGNIN_REQUEST)
    const {phone, password} = action.data // Cognito is set to accept phonenumbers as usernames

    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.signIn(phone, password)
      if (response.constructor.name === 'CognitoUser') {
        // api call here ?
        const user = yield Auth.currentUserInfo()
        console.log(user)
        yield put(addCognitoUserData(user))
        yield put(setAuthState('authorized'))

        // if still onboarding the don't redirect to homescreen
        // todo: this means they could skip the testnet bit of the onboarding if they reload and then login
        // instead of continuing along the onboarding path here.
        const userData = yield select((state) => state.onboarding.userData)
        if (Object.keys(userData).length) yield put(setVerificationState('verified'))
        else NavigationService.resetFromTo('Main', 'Tabs')
      } else throw new Error('Auth.signIn has not returned a user')
    } catch (err) {
      if (err.code === 'UserNotFoundException') {
        // alert user here
        console.log(err)
      } else if (err.code === 'UserNotConfirmedException') {
        yield put(setVerificationState('unconfirmed'))
        console.log(err)
        // redirect to VerifyPhoneScreen here?
      } else if (err.code === 'NotAuthorizedException' && err.message === 'User is disabled') {
        // user has been disabled because of violations perhaps?
        console.log(err)
      } else {
        console.error(err)
      }
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * confirmSignIn () {
  while (true) {
    const action = yield take(SIGNIN_CONFIRM_REQUEST)
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.confirmSignIn(action.code)
      console.log(response)
      const user = yield Auth.currentUserInfo()
      yield put(addCognitoUserData(user))
      yield put(setAuthState('authorized'))
      NavigationService.resetFromTo('Main', 'Tabs')
    } catch (err) {
      console.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * signOut () {
  while (true) {
    yield take(SIGNOUT_REQUEST)
    try {
      yield put(showLoadingSpinner())
      yield Auth.signOut()
      yield put(setAuthState('unauthorized'))
      NavigationService.resetFromTo('Main', 'Main')
    } catch (err) {
      console.log(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * initSignUp () {
  while (true) {
    const action = yield take(SIGNUP_REQUEST)
    const {email, name, password, phone, picture} = action.data
    try {
      yield put(showLoadingSpinner())
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
    } catch (err) {
      if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's wipe their onboarding data and try to log them in
          yield put(wipeOnboardingData())
          yield put({ type: 'SIGNIN_REQUEST', data: action.data })
        } catch (err) {
          // they still have yet to confirm
          if (err.code === 'UserNotConfirmedException') {
            yield put(setVerificationState('unconfirmed'))
          } else {
            console.error(err)
          }
        }
      } else {
        console.error(err)
      }
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * confirmSignUp () {
  while (true) {
    const action = yield take(SIGNUP_CONFIRM_REQUEST)
    const {phone, code} = action.data

    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.confirmSignUp(phone, code)
      if (response === 'SUCCESS') {
        yield put({ type: 'SIGNIN_REQUEST', data: action.data })
      } else throw Error('unexpected response:' + response)
    } catch (err) {
      if (err.code === 'CodeMismatchException') yield put(setVerificationState('incorrect'))
      else if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's try to log them in
          yield put({ type: 'SIGNIN_REQUEST', action })
        } catch (err) {
          console.error(err)
        }
      } else {
        console.error(err)
      }
    } finally {
      yield put(hideLoadingSpinner())
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
