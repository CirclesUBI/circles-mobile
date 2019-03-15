import { call, select, fork, put, take } from 'redux-saga/effects'
import { Constants, SecureStore } from 'expo'
import 'ethers/dist/shims.js'
import { ethers } from 'ethers'
import {
  customHttpProvider,
  HubContract,
  RelayContract,
  getNonce,
  getTypesFromAbi,
  add0x,
  encodeFunctionTxData,
  stripIt,
  pad
} from 'circles-mobile/lib/utilities/blockchain'
import { push } from 'react-router-redux'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

import { ConsoleLogger } from '@aws-amplify/core'

import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import { hideLoadingSpinner, setAuthState, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { wipeOnboardingData, setVerificationState } from 'circles-mobile/lib/actions/OnboardingActions'
import { SIGNIN_REQUEST, SIGNOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_CONFIRM_REQUEST, SIGNIN_CONFIRM_REQUEST } from 'circles-mobile/lib/constants/AuthConstants'
import { addCognitoUserData, addDbUserData } from 'circles-mobile/lib/actions/AuthActions'
import { userTokenCreated } from 'circles-mobile/lib/actions/UserActions'

const logger = new ConsoleLogger('Auth Saga')

export function * initSignIn () {
  while (true) {
    const action = yield take(SIGNIN_REQUEST)
    const { username, password } = action.data // Cognito is set to accept phonenumbers as usernames
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.signIn(username, password)
      if (response) {
        yield call(initAddUser)
        const finishedOnboarding = yield select((state) => state.user.agreed_to_disclaimer)
        if (finishedOnboarding) {
          yield put(setAuthState('authorized'))
          yield put(wipeOnboardingData())
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

export function * confirmSignIn () {
  while (true) {
    const action = yield take(SIGNIN_CONFIRM_REQUEST)
    try {
      yield put(showLoadingSpinner())
      const response = yield Auth.confirmSignIn(action.code)
      const user = yield Auth.currentUserInfo()
      yield put(addCognitoUserData(user))
      yield put(setAuthState('authorized'))
      NavigationService.resetFromTo('Main', 'Tabs')
    } catch (err) {
      logger.error(err)
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
    yield put(showLoadingSpinner())
    let wallet = ethers.Wallet.createRandom()
    yield SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
    yield call(createCirclesToken)
    const tokenAddress = yield select((state) => state.user.tokenAddress)
    const cognitoUser = yield Auth.currentAuthenticatedUser()
    cognitoUser.attributes.username = cognitoUser.username
    const token = cognitoUser.signInUserSession.accessToken.jwtToken
    console.log('walletAddress', wallet.address)
    const myInit = { // OPTIONAL
      body: Object.assign({}, cognitoUser.attributes, { address: wallet.address, token_address: tokenAddress }),
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

export function * createCirclesToken () {
  const cognitoUser = yield Auth.currentAuthenticatedUser()
  let wallet = yield SecureStore.getItemAsync('wallet')
  wallet = JSON.parse(wallet)
  wallet = new ethers.Wallet(wallet.signingKey.privateKey, customHttpProvider)
  if (wallet) {
    const senderKeyPair = {
      privateKey: wallet.privateKey,
      publicKey: ethers.utils.computePublicKey(wallet.privateKey),
      address: wallet.address
    }
    const relayNonce = yield getNonce(senderKeyPair.address)
    let nonce = ethers.utils.hexlify(relayNonce)
    let to = HubContract.address
    let data = HubContract.interface.functions.signup.encode([senderKeyPair.address, cognitoUser.username])
    // Tight packing, as Solidity sha3 does
    let hashInput = '0x1900' + stripIt(RelayContract.address) +
      stripIt('0x0000000000000000000000000000000000000000') + pad(nonce) + stripIt(to) + stripIt(data)
    var hash = ethers.utils.keccak256(hashInput)
    let signingKey = new ethers.utils.SigningKey(wallet.privateKey)
    let sig = signingKey.signDigest(hash)
    let abi = RelayContract.interface.abi
    let functionName = 'relayMetaTx'
    let args = [ sig.v,
      sig.r,
      sig.s,
      to,
      data,
      '0x0000000000000000000000000000000000000000'
    ]
    var types = getTypesFromAbi(abi, functionName)
    var txData = encodeFunctionTxData(functionName, types, args)
    var txObject = {}
    txObject.to = add0x(RelayContract.address)
    txObject.gasPrice = yield customHttpProvider.getGasPrice()
    txObject.gasLimit = 1600000
    txObject.nonce = add0x(nonce)
    txObject.data = add0x(txData)
    txObject.value = add0x(ethers.utils.hexlify(0))
    let tx = ethers.utils.serializeTransaction(txObject)
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
    // put(push('Testnet'))
  } else {
    logger.error('Wallet not successfully retrieved')
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
