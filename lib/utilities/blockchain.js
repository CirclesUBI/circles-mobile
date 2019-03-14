import { RPC_URL } from 'react-native-dotenv'
import { HubABI, HubAddress } from '../abi/Hub'
import { RelayABI, RelayAddress } from '../abi/Relay'
import { ethers } from 'ethers'
import CryptoJS from 'crypto-js'
import leftPad from 'left-pad'

export const customHttpProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export const HubContract = new ethers.Contract(HubAddress, HubABI, customHttpProvider)
export const RelayContract = new ethers.Contract(RelayAddress, RelayABI, customHttpProvider)

export const getNonce = async (sender) => {
  return RelayContract.getNonce(sender)
}

export function getTypesFromAbi (abi, functionName) {
  function matchesFunctionName (json) {
    return (json.name === functionName && json.type === 'function')
  }

  function getTypes (json) {
    return json.type
  }

  var funcJson = abi.filter(matchesFunctionName)[0]

  return (funcJson.inputs).map(getTypes)
}

export function encodeFunctionTxData (functionName, types, args) {
  var fullName = functionName + '(' + types.join() + ')'
  var signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8)
  var dataHex = signature + ethers.utils.defaultAbiCoder.encode(types, args).slice(2)

  return dataHex
}

export function add0x (input) {
  if (typeof (input) !== 'string') {
    return input
  } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
    return '0x' + input
  } else {
    return input
  }
}

export function stripIt (val) {
  if (val.slice(0, 2) === '0x') {
    return val.slice(2)
  }
  return val
}

export function pad (n) {
  if (n.startsWith('0x')) {
    n = stripIt(n)
  }
  return leftPad(n, '64', '0')
}

export default {
  ethers
}
