import { call, select, fork, put, take } from 'redux-saga/effects'
import { GET_TOKEN_DATA } from 'circles-mobile/lib/constants/TokenConstants'
import { updateWallet } from 'circles-mobile/lib/actions/WalletActions'
import { TokenContractResolver } from 'circles-mobile/lib/utilities/blockchain'

export function * getTokenData () {
  while (true) {
    const action = yield take(GET_TOKEN_DATA)
    let contract = yield TokenContractResolver(action.tokenAddress)
    const userAddress = yield select((state) => state.user.wallet_address)
    const walletDisplayName = yield select((state) => state.user.display_name)
    let balance = yield contract.balanceOf(userAddress)
    yield put(updateWallet({ walletName: userAddress, balance, primary: true, displayName: walletDisplayName }))
    // const action = yield take(SIGNUP_CONFIRM_REQUEST)
    // const { username, code } = action.data
    // try {
    //   yield put(showLoadingSpinner())
    //   const response = yield Auth.confirmSignUp(username, code)
    //   if (response === 'SUCCESS') {
    //     // yield call(createCirclesToken)
    //     yield put({ type: 'SIGNIN_REQUEST', data: action.data })
    //   } else throw Error('unexpected response:' + response)
    // } catch (err) {
    //   if (err.code === 'CodeMismatchException') yield put(setVerificationState('incorrect'))
    //   else if (err.code === 'UsernameExistsException') {
    //     try {
    //       // if they exist then let's try to log them in
    //       yield put({ type: 'SIGNIN_REQUEST', action })
    //     } catch (err) {
    //       logger.error(err)
    //     }
    //   } else {
    //     logger.error(err)
    //   }
    // } finally {
    //   yield put(hideLoadingSpinner())
    // }
  }
}

function * TokenSaga () {
  yield fork(getTokenData)
  // yield fork(initSignIn)
  // yield fork(initSignUp)
  // yield fork(confirmSignUp)
  // yield fork(signOut)
}

export default TokenSaga
