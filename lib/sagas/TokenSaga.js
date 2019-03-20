import { call, select, fork, put, take } from 'redux-saga/effects'
import { GET_TOKEN_DATA } from 'circles-mobile/lib/constants/TokenConstants'
import { updateWallet } from 'circles-mobile/lib/actions/WalletActions'
import { TokenContractResolver } from 'circles-mobile/lib/utilities/blockchain'
import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('Token Saga')
export function * getTokenData () {
  while (true) {
    const action = yield take(GET_TOKEN_DATA)
    try {
      let contract = yield TokenContractResolver(action.tokenAddress)
      const userAddress = yield select((state) => state.user.wallet_address)
      const walletDisplayName = yield select((state) => state.user.display_name)
      let balance = yield contract.balanceOf(userAddress)
      yield put(updateWallet({ walletName: userAddress, balance, primary: true, displayName: walletDisplayName }))
    } catch (err) {
      logger.error(err)
    }
  }
}

function * TokenSaga () {
  yield fork(getTokenData)
}

export default TokenSaga
