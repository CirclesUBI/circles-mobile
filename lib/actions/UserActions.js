import { WALLET_SELECTED } from 'circles-mobile/lib/constants/UserConstants'

export function walletSelect (wallet) {
  return {
    type: WALLET_SELECTED,
    wallet
  }
}
