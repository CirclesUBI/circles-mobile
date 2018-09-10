// import { VERIFY_BY_SMS, VERIFY_PHONE_CODE, VERIFY_BY_PHONE, VERIFY_RECAPTCHA, VERIFY_FUNCAPTCHA } from 'circles-mobile/lib/constants/UportActionTypes'
import { takeEvery, call, put, select, all } from 'redux-saga/effects'
// import { connected, waitUntilConnected } from './networkState'
// import { defaultNetwork } from 'circles-mobile/lib/utilities/networks'
// import { createIdentity, storeFuelToken, addClaims } from 'circles-mobile/lib/actions/uportActions'
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
import { FETCH_CURRENT_COUNTRY } from 'circles-mobile/lib/constants/OnboardingConstants'
// import {
//   saveMessage, startWorking, completeProcess, failProcess
// } from 'circles-mobile/lib/actions/processStatusActions'
// import { onboardingNetwork, deviceAddress } from 'circles-mobile/lib/selectors/chains'
// import { selectOrCreateIdentityKey } from './keychain'
// import Intercom from 'react-native-intercom'
// import config from 'circles-mobile/lib/config'

const NISABA_ROUTE = 'https://nisaba.uport.me'
export const VERIFICATION_ROUTE = NISABA_ROUTE + '/api/v2/verify'
export const CODE_VERIFICATION_ROUTE = VERIFICATION_ROUTE + '/check'
export const REQUEST_PHONECALL_ROUTE = VERIFICATION_ROUTE + '/next'

// export function * verificationSMS ({phone}) {
//   try {
//     yield put(startWorking('verificationSMS'))
//     const selectedNetwork = yield select(onboardingNetwork)
//     const deviceKey = yield call(selectOrCreateIdentityKey, selectedNetwork || defaultNetwork.name)
//     yield put(addClaims('new', { phone }))
//     yield put(saveMessage('verificationSMS', 'Sending verification code'))
//     yield call(waitUntilConnected)
//     const response = yield call(fetch, VERIFICATION_ROUTE, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({deviceKey, phoneNumber: phone})
//     })
//     // console.log(response)
//     const responseJson = yield call(response.json.bind(response))
//     if (response.status === 200) {
//       yield put(completeProcess('verificationSMS'))
//       yield call([Intercom, Intercom.logEvent], 'verificationSMSComplete')
//       return true
//     } else {
//       // Check response for concurrent verifications
//       if (responseJson.message && responseJson.message.includes('nexmo.status=10')) {
//         yield put(completeProcess('verificationSMS'))
//       } else {
//         yield put(failProcess('verificationSMS', 'Error verifying phone'))
//         yield call([Intercom, Intercom.logEvent], 'verificationSMSError', {message: responseJson.message})
//       }
//     }
//     // console.log(response)
//   } catch (error) {
//     yield put(failProcess('verificationSMS', "Can't connect to verification service"))
//     yield call([Intercom, Intercom.logEvent], 'verificationSMSError', {message: error.message})
//   }
// }
//
// export function * verificationCall () {
//   // console.log('verificationCall')
//   try {
//     yield put(startWorking('verificationCall'))
//     yield put(saveMessage('verificationCall', 'Calling...'))
//
//     const address = yield select(deviceAddress)
//     // console.log(key['address'])
//     yield call(waitUntilConnected)
//     const response = yield call(fetch, `${REQUEST_PHONECALL_ROUTE}/${address}`, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json'
//       }})
//     if (response.status === 200) {
//       yield put(completeProcess('verificationCall'))
//       yield call([Intercom, Intercom.logEvent], 'verificationCallComplete')
//       return true
//     } else {
//       const responseJson = yield call(response.json.bind(response))
//       yield put(failProcess('verificationCall', 'Error making phone call'))
//       yield call([Intercom, Intercom.logEvent], 'verificationCallError', {message: responseJson.message})
//     }
//   } catch (error) {
//     yield put(failProcess('verificationCall', 'Error making phone call'))
//     yield call([Intercom, Intercom.logEvent], 'verificationCallError', {message: error.message})
//     // console.log(e)
//   }
// }
//
// export function * verifyPhoneCode ({address, code}) {
//   try {
//     yield put(startWorking('verifyPhoneCode'))
//     yield put(saveMessage('verifyPhoneCode', 'Verifying code'))
//     const deviceKey = yield select(deviceAddress)
//     yield call(waitUntilConnected)
//     const response = yield call(fetch, `${CODE_VERIFICATION_ROUTE}`, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({deviceKey, code})})
//     const responseJson = yield call(response.json.bind(response))
//     if (response.status === 200) {
//       yield put(storeFuelToken(address || 'new', responseJson.data))
//       yield put(completeProcess('verifyPhoneCode'))
//       console.log(`address= ${address}`)
//       if (!address || address === 'new') {
//         yield put(createIdentity())
//       }
//       yield call([Intercom, Intercom.logEvent], 'verifyPhoneCodeComplete')
//       return true
//     } else {
//       yield put(failProcess('verifyPhoneCode', 'Invalid code'))
//       yield call([Intercom, Intercom.logEvent], 'verifyPhoneCodeError', {message: responseJson.message})
//     }
//   } catch (error) {
//     // console.log('error verifying phone code')
//     yield put(failProcess('verifyPhoneCode', "Can't connect to verification service"))
//     yield call([Intercom, Intercom.logEvent], 'verifyPhoneCodeError', {message: error.message})
//     // console.log(error)
//   }
// }
//
// export function * verifyReCaptcha ({address, reCaptchaToken}) {
//   try {
//     yield put(startWorking('verifyReCaptcha'))
//     yield put(saveMessage('verifyReCaptcha', 'Verifying that You are not a robot'))
//     const selectedNetwork = yield select(onboardingNetwork)
//     const deviceKey = yield call(selectOrCreateIdentityKey, selectedNetwork || defaultNetwork.name)
//     yield call(waitUntilConnected)
//     const response = yield call(fetch, config.recaptcha.verificationUrl, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({deviceKey, reCaptchaToken})})
//     const responseJson = yield call(response.json.bind(response))
//     if (response.status === 200) {
//       yield put(storeFuelToken(address || 'new', responseJson.data))
//       yield put(completeProcess('verifyReCaptcha'))
//       if (!address || address === 'new') {
//         yield put(createIdentity())
//       }
//       yield call([Intercom, Intercom.logEvent], 'verifyReCaptchaComplete')
//       return true
//     } else {
//       yield put(failProcess('verifyReCaptcha', 'Invalid reCaptchaToken'))
//       yield call([Intercom, Intercom.logEvent], 'verifyReCaptchaError', {message: responseJson.message})
//     }
//   } catch (error) {
//     yield put(failProcess('verifyReCaptcha', "Can't connect to verification service"))
//     yield call([Intercom, Intercom.logEvent], 'verifyReCaptchaError', {message: error.message})
//   }
// }
//
// export function * verifyFunCaptcha ({address, funCaptchaToken}) {
//   try {
//     yield put(startWorking('verifyFunCaptcha'))
//     yield put(saveMessage('verifyFunCaptcha', 'Verifying that You are not a robot'))
//     const selectedNetwork = yield select(onboardingNetwork)
//     const deviceKey = yield call(selectOrCreateIdentityKey, selectedNetwork || defaultNetwork.name)
//     yield call(waitUntilConnected)
//     const response = yield call(fetch, config.funcaptcha.verificationUrl, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({deviceKey, funCaptchaToken})})
//     const responseJson = yield call(response.json.bind(response))
//     if (response.status === 200) {
//       yield put(storeFuelToken(address || 'new', responseJson.data))
//       yield put(completeProcess('verifyFunCaptcha'))
//       if (!address || address === 'new') {
//         yield put(createIdentity())
//       }
//       yield call([Intercom, Intercom.logEvent], 'verifyFunCaptchaComplete')
//       return true
//     } else {
//       yield put(failProcess('verifyFunCaptcha', 'Invalid funCaptchaToken'))
//       yield call([Intercom, Intercom.logEvent], 'verifyFunCaptchaError', {message: responseJson.message})
//     }
//   } catch (error) {
//     yield put(failProcess('verifyFunCaptcha', "Can't connect to verification service"))
//     yield call([Intercom, Intercom.logEvent], 'verifyFunCaptchaError', {message: error.message})
//   }
// }

export function * fetchCurrentCountry () {
  // const isConnected = yield call(connected)
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
  } catch (error) {
    console.log(error)
  }
}

function * nisabaSaga () {
  yield all([
    // takeEvery(VERIFY_BY_SMS, verificationSMS),
    // takeEvery(VERIFY_PHONE_CODE, verifyPhoneCode),
    // takeEvery(VERIFY_RECAPTCHA, verifyReCaptcha),
    // takeEvery(VERIFY_FUNCAPTCHA, verifyFunCaptcha),
    // takeEvery(VERIFY_BY_PHONE, verificationCall),
    takeEvery(FETCH_CURRENT_COUNTRY, fetchCurrentCountry)
  ])
}

export default nisabaSaga