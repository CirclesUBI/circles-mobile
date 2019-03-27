import { call, select, fork, put, take } from 'redux-saga/effects'
import { Constants, SecureStore } from 'expo'
import { ethers } from 'ethers'
import {
  HubContract,
  generateKeyPair,
  metaTxGenerator
} from 'circles-mobile/lib/utilities/blockchain'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

import { ConsoleLogger } from '@aws-amplify/core'

import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import { hideLoadingSpinner, setAuthState, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { wipeOnboardingData, setVerificationState } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, INIT_FORGOT_PASSWORD, CONFIRM_FORGOT_PASSWORD, CHECK_USERNAME_EXISTS } from 'circles-mobile/lib/constants/AuthConstants'
import { addDbUserData } from 'circles-mobile/lib/actions/AuthActions'
import { userTokenCreated } from 'circles-mobile/lib/actions/UserActions'
import { addRecoveryData, wipeRecoveryData } from 'circles-mobile/lib/actions/RecoveryActions'

const logger = new ConsoleLogger('Auth Saga')

export function * initSignIn () {
  while (true) { // todo: why is this here?
    const action = yield take(SIGNIN_REQUEST)
    const { username, password } = action.data // Cognito is set to accept phonenumbers as usernames
    try {
      yield put(showLoadingSpinner())      
      const response = yield Auth.signIn(username, password)
      logger.debug('Auth.signIn response: ' + JSON.stringify(response))
      if (response) {
        yield call(initAddUser)
        const finishedOnboarding = yield select((state) => state.user.agreed_to_disclaimer)
        logger.debug('finishedOnboarding: ' + finishedOnboarding)
        if (finishedOnboarding) {
          yield put(setAuthState('authorized'))
          yield put(wipeOnboardingData())
          const cognitoUser = yield Auth.currentAuthenticatedUser()
          const token = cognitoUser.signInUserSession.accessToken.jwtToken
          const myInit = { // OPTIONAL
            headers: {
              accesstoken: token
            }
          }
          let response = yield API.get('users', '', myInit)
          yield put(addDbUserData(response))
          logger.debug('addDbUserData response: ' + response)
          NavigationService.resetFromTo('Main', 'Tabs')
        } else {
          yield put(setVerificationState('verified'))
          // todo: redirect back to onboarding here ...
        }
      } else throw new Error('Auth.signIn has not returned a user')
    } catch (err) {
      if (err.code === 'UserNotFoundException') {
        // alert user here
        logger.error(err)
      } else if (err.code === 'UserNotConfirmedException') {
        yield put(setVerificationState('unconfirmed'))
        logger.error(err)
        // redirect to VerifyPhoneScreen here?
      } else if (err.code === 'NotAuthorizedException' && err.message === 'User is disabled') {
        // user has been disabled because of violations perhaps?
        logger.error(err)
      } else {
        logger.error(err)
      }
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
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * initSignUp () {
  while (true) {
    const action = yield take(SIGNUP_REQUEST)
    const { username, email, name, password, phone, picture } = action.data
    if (!picture) picture = 'nopic'
    try {
      yield put(showLoadingSpinner())
      let response = yield Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
          name: name,
          phone_number: phone,
          picture: picture,
          'custom:device_id': Constants.deviceId // for push notifications
        }
      })
      logger.debug('initSignUp response', response)
    } catch (err) {
      if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's  try to log them in
          yield put({ type: 'SIGNIN_REQUEST', data: action.data })
        } catch (err) {
          // they still have yet to confirm
          if (err.code === 'UserNotConfirmedException') {
            yield put(setVerificationState('unconfirmed'))
          } else {
            logger.error(err)
          }
        }
      } else {
        logger.error(err)
      }
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * confirmSignUp () {
  while (true) { 
    const action = yield take(SIGNUP_CONFIRM_REQUEST)
    const { username, code } = action.data
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.confirmSignUp(username, code)
      if (response === 'SUCCESS') {
        // yield call(createCirclesToken)
        yield put({ type: 'SIGNIN_REQUEST', data: action.data })
      } else throw Error('unexpected response:' + response)
    } catch (err) {
      if (err.code === 'CodeMismatchException') yield put(setVerificationState('incorrect'))
      else if (err.code === 'UsernameExistsException') {
        try {
          // if they exist then let's try to log them in
          yield put({ type: 'SIGNIN_REQUEST', action })
        } catch (err) {
          logger.error(err)
        }
      } else {
        logger.error(err)
      }
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * initAddUser () {
  try {
    logger.debug('initAddUser')
    yield put(showLoadingSpinner())
    let wallet = ethers.Wallet.createRandom()
    yield SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
    yield call(createCirclesToken)
    const tokenAddress = yield select((state) => state.user.token_address)
    const cognitoUser = yield Auth.currentAuthenticatedUser()
    cognitoUser.attributes.username = cognitoUser.username
    const token = cognitoUser.signInUserSession.accessToken.jwtToken
    const myInit = { // OPTIONAL
      body: Object.assign({}, cognitoUser.attributes), //{ wallet_address: wallet.address, token_address: tokenAddress }),
      headers: {
        accesstoken: token
      }
    }
    let response = yield API.post('users', '', myInit)
    logger.debug('initAddUser POST response', response)
    yield put(addDbUserData(response))
    NavigationService.navigate('SeedPhrase')
  } catch (err) {
    logger.error(err)
  } finally {
    yield put(hideLoadingSpinner())
  }
}

// console.log('HubContract.interface.functions.signup.encode', HubContract.interface.functions.signup.encode)

export function * createCirclesToken () {
  logger.debug('createCirclesToken')    
  const cognitoUser = yield Auth.currentAuthenticatedUser()  
  let wallet = JSON.parse(yield SecureStore.getItemAsync('wallet'))
  const senderKeyPair = generateKeyPair(wallet.signingKey.privateKey)
  let to = HubContract.address
  let data = HubContract.interface.functions.signup.encode([senderKeyPair.address, cognitoUser.username])
  let tx = yield metaTxGenerator.generateMetaTxHash(senderKeyPair, to, data)
  try {
    const cognitoUser = yield Auth.currentAuthenticatedUser()
    const token = cognitoUser.signInUserSession.accessToken.jwtToken
    const apiName = 'relayer'
    const path = '/relay'
    const params = {
      body: {
        address: wallet.address,
        metaSignedTx: tx
      },
      headers: {
        accesstoken: token
      },
      response: true
    }    
    let response = yield API.post(apiName, path, params)
    // console.log('response', response)
    yield put(userTokenCreated(response.data))
    logger.debug('create POST response', response)
  } catch (error) {
    logger.error(error)
  }
}

export function * initForgotPassword () {
  while (true) {
    const action = yield take(INIT_FORGOT_PASSWORD)
    const { username } = action.data
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.forgotPassword(username)
      logger.info('initForgotPassword response', response)
      yield put(addRecoveryData({username: username, ...response.CodeDeliveryDetails}))
      NavigationService.navigate('ForgotVerify')
    } catch (err) {
      if (err.code === 'UserNotFoundException') {
        // alert user that username does not exist        
      } else if (err.code === 'InvalidParameterException') {
        // alert user that this account has not fully registered
      } else if (err.code === 'LimitExceededException') {
        // "message": "Attempt limit exceeded, please try after some time."
      } 
      logger.error(err)      
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * confirmForgotPassword () {
  while (true) { 
    const action = yield take(CONFIRM_FORGOT_PASSWORD)
    const { username, code, password } = action.data
    try {
      yield put(showLoadingSpinner())
      yield Auth.forgotPasswordSubmit(username, code, password)      

      const wallet = yield SecureStore.getItemAsync('wallet')     
      if (!wallet)
        NavigationService.navigate('ForgotSeed')
      else {
        yield put(wipeRecoveryData())        
        // tell user their password has been updated and redirect to homescreen
        yield put({ type: 'SIGNOUT_REQUEST' })
      }
    } catch (err) {
      if (err.code === 'CodeMismatchException') {
        yield put(setVerificationState('incorrect'))
        // todo: alert user that the code is incorrect and redirect to code page
      }
      else if (err.code === 'ExpiredCodeException') {
        yield put(setVerificationState('expired'))
        // todo: alert user that the code is expired and redirect to code page
      }
      logger.error(err)      
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

function * authSaga () {
  yield fork(initSignIn)
  yield fork(initSignUp)
  yield fork(confirmSignUp)
  yield fork(signOut)
  yield fork(initForgotPassword)
  yield fork(confirmForgotPassword)
}

export default authSaga
