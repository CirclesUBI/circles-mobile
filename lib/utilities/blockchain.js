import { RPC_URL } from 'react-native-dotenv'
import { HubABI, HubAddress } from '../abi/Hub'
// import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { RelayABI, RelayAddress } from '../abi/Relay'
import { TokenABI } from '../abi/Token'
import 'ethers/dist/shims.js'
import { ethers } from 'ethers'

import MetaTxGenerator from 'circles-mobile/metatx-client'

export const customHttpProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export const HubContract = new ethers.Contract(HubAddress, HubABI, customHttpProvider)

export const TokenContractResolver = (address) => (
  new ethers.Contract(address, TokenABI, customHttpProvider)
)

export function generateKeyPair (privKey) {
  try {
    let wallet = new ethers.Wallet(privKey)
    return {
      privateKey: wallet.privateKey,
      publicKey: ethers.utils.computePublicKey(wallet.privateKey),
      address: wallet.address
    }
  } catch (err) {
    console.error(err, 'error connecting wallet')
  }
}

export const metaTxGenerator = new MetaTxGenerator(customHttpProvider, RelayAddress, RelayABI)

export default {
  ethers
}
