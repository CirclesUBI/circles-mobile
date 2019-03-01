import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, DISMISS_CONTACT_SUGGESTION, SET_AUTH_STATE, SHOW_LOADING_SPINNER, HIDE_LOADING_SPINNER } from 'circles-mobile/lib/constants/AppConstants'

export function selectWallet (wallet) {
  return {
    type: WALLET_SELECTED,
    wallet
  }
}

export function selectTransactionWallet (wallet) {
  return {
    type: TRANSACTION_WALLET_SELECTED,
    wallet
  }
}

export function dismissedContact () {
  return {
    type: DISMISS_CONTACT_SUGGESTION
  }
}

export function showLoadingSpinner () {
  return {
    type: SHOW_LOADING_SPINNER
  }
}

export function hideLoadingSpinner () {
  return {
    type: HIDE_LOADING_SPINNER
  }
}

export function setAuthState (authState) {
  return {
    type: SET_AUTH_STATE,
    authState
  }
}
