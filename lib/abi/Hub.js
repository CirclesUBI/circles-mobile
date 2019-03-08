import { HUB_ADDRESS } from 'react-native-dotenv'
let obj = require('../../contracts/build/contracts/Hub.json')

const HubABI = obj.abi

const HubBytecode = obj.bytecode

const HubAddress = HUB_ADDRESS

module.exports = {
  HubABI,
  HubBytecode,
  HubAddress
}
