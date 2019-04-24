import { RELAY_ADDRESS } from 'react-native-dotenv'
let obj = require('../../contracts/build/contracts/TxRelay.json')

const RelayABI = obj.abi

const RelayBytecode = obj.bytecode

const RelayAddress = RELAY_ADDRESS

module.exports = {
  RelayABI,
  RelayBytecode,
  RelayAddress
}
