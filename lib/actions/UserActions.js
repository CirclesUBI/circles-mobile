import { WALLET_SELECTED, VALIDATE_USER } from 'circles-mobile/lib/constants/UserConstants'

export function walletSelect (wallet) {
  return {
    type: WALLET_SELECTED,
    wallet
  }
}

export function validateUser () {
  return {
    type: VALIDATE_USER
  }
}
