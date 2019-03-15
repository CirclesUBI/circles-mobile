import { WALLET_ADDED, UPDATE_WALLET, SEND_PAYMENT, REQUEST_PAYMENT } from 'circles-mobile/lib/constants/WalletConstants'

export function walletAdd (newWallet) {
  return {
    type: WALLET_ADDED,
    newWallet
  }
}

export function updateWallet (walletDetails) {
  return {
    type: UPDATE_WALLET,
    walletDetails
  }
}

export function sendPayment (from, to, value, timestamp) {
  return {
    type: SEND_PAYMENT,
    from,
    to,
    value
  }
}

export function requestPayment (from, to, value, timestamp) {
  return {
    type: REQUEST_PAYMENT,
    from,
    to,
    value
  }
}
