import { WALLET_ADDED } from 'circles-mobile/lib/constants/WalletConstants'

export function walletAdd (newWallet) {
  return {
    type: WALLET_ADDED,
    newWallet
  }
}
