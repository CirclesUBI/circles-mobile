import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'

export function walletSelect (wallet) {
  return {
    type: WALLET_SELECTED,
    wallet
  }
}

export function selectedTransactionWallet (wallet) {
  return {
    type: TRANSACTION_WALLET_SELECTED,
    wallet
  }
}
