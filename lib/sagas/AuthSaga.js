// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { takeEvery, put, all } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

// import { addUserData } from 'circles-mobile/lib/actions/AuthActions'
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGN_IN, SIGN_OUT } from 'circles-mobile/lib/constants/AuthConstants'

export function * signIn (action) {
  console.log('AuthSaga signIn', action)
  try {
    let response = yield Auth.signIn(action.signInDetails.username, action.signInDetails.password)
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

function * authSaga () {
  yield all([
    takeEvery(SIGN_IN, signIn),
    takeEvery(SIGN_OUT, signOut)
  ])
}

export default authSaga
