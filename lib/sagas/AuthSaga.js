import { call, select, fork, put, take } from 'redux-saga/effects'
import { SecureStore, Constants } from 'expo'
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
import { SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, INIT_FORGOT_PASSWORD, CONFIRM_FORGOT_PASSWORD, INIT_RECOVER_ACCOUNT } from 'circles-mobile/lib/constants/AuthConstants'
import { addDbUserData } from 'circles-mobile/lib/actions/AuthActions'
import { userTokenCreated } from 'circles-mobile/lib/actions/UserActions'
import { addRecoveryData, wipeRecoveryData } from 'circles-mobile/lib/actions/RecoveryActions'

// import DeviceInfo from 'react-native-device-info'

const logger = new ConsoleLogger('Auth Saga')

export function * initSignIn () {
  while (true) {
    const action = yield take(SIGNIN_REQUEST)
    const { username, password } = action.data
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.signIn(username, password)
      logger.debug('Auth.signIn response: ' + JSON.stringify(response))
      if (response) {
        yield call(initAddUser, password)
        const finishedOnboarding = yield select((state) => state.user.agreed_to_disclaimer)
        logger.debug('finishedOnboarding: ' + finishedOnboarding)
        if (finishedOnboarding) {
          yield put(setAuthState('authorized'))
          yield put(wipeOnboardingData())
          const cognitoUser = yield Auth.currentAuthenticatedUser()
          const token = cognitoUser.signInUserSession.accessToken.jwtToken
          const myInit = {
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
          NavigationService.navigate('SeedPhrase')
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
      let signUpParams = {
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: phone,
          picture: picture,
          'custom:device_id': Constants.deviceId // for push notifications
        }
      }
      // can't send a blank attribute, so only add name if present
      if (name) signUpParams.attributes.name = name
      let response = yield Auth.signUp(signUpParams)
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

export function * initAddUser (password) {
  try {
    yield put(showLoadingSpinner())
    let wallet = ethers.Wallet.createRandom()
    yield SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
    // yield call(createCirclesToken)
    // const tokenAddress = yield select((state) => state.user.token_address)
    const tokenAddress = '0x0000000000001'
    const cognitoUser = yield Auth.currentAuthenticatedUser()
    logger.debug('cognitoUser: ' + cognitoUser)
    cognitoUser.attributes.username = cognitoUser.username
    const token = cognitoUser.signInUserSession.accessToken.jwtToken
    logger.debug('token: ' + token)
    const myInit = {
      body: Object.assign({}, cognitoUser.attributes, { wallet_address: wallet.address, token_address: tokenAddress }),
      headers: {
        accesstoken: token
      }
    }
    let response = yield API.post('users', '', myInit)
    logger.debug('initAddUser POST response', response)
    yield put(addDbUserData(response))

    // We need to signIn again here so that we can get new auth tokens that include the cognito groups
    const signInResponse = yield Auth.signIn(cognitoUser.username, password)
    logger.debug('initAddUser Auth.signIn response', signInResponse)
    NavigationService.navigate('SeedPhrase')
  } catch (err) {
    logger.error(err)
  } finally {
    yield put(hideLoadingSpinner())
  }
}

export function * createCirclesToken () {
  logger.debug('createCirclesToken')
  const cognitoUser = yield Auth.currentAuthenticatedUser()
  let wallet = JSON.parse(yield SecureStore.getItemAsync('wallet'))
  const senderKeyPair = generateKeyPair(wallet.signingKey.privateKey)
  const to = HubContract.address
  const data = HubContract.interface.functions.signup.encode([senderKeyPair.address, cognitoUser.username])
  const tx = yield metaTxGenerator.generateMetaTxHash(senderKeyPair, to, data)
  try {
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
    const response = yield API.post(apiName, path, params)
    logger.debug('createCirclesToken post response: ' + response)
    yield put(userTokenCreated(response.data))
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
      logger.debug('initForgotPassword response', response)
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

export function * initRecoverAccount () {
  while (true) {
    const action = yield take(INIT_RECOVER_ACCOUNT)
    const { phone } = action.data
    try {
      yield put(showLoadingSpinner())
      const wallet = JSON.parse( yield SecureStore.getItemAsync('wallet') )
      const signingKey = new ethers.utils.SigningKey(wallet.signingKey.privateKey)
      logger.debug('signingKey: '+ signingKey)
      if (signingKey.address !== wallet.signingKey.address)
        logger.error('signingKey.address does not match wallet address!')

      const message = Date.now()
      const messageHex = `0x${message.toString(16)}`
      const messageDigest = ethers.utils.keccak256(messageHex)
      const signature = signingKey.signDigest(messageDigest)
      logger.debug('signature: '+ signature)
      const myInit = {
        body: {
          message: message,
          signature: signature,
          device_id:  Constants.deviceId, // DeviceInfo.getUniqueID(),
          phone_number: phone
        }
      }
      const response = yield API.post('users', '/recovery', myInit)
      logger.debug('initRecoverAccount POST response', response)
      yield put(addDbUserData(response))

      // tell user their wallet has been recovered and redirect to homescreen
      yield put({ type: 'SIGNOUT_REQUEST' })
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

function * authSaga () {
  yield fork(initSignIn)
  yield fork(initSignUp)
  yield fork(confirmSignUp)
  yield fork(signOut)
  yield fork(initForgotPassword)
  yield fork(confirmForgotPassword)
  yield fork(initRecoverAccount)
}

export default authSaga
