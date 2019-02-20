let obj = require('../../contracts/build/contracts/Hub.json')

const HubABI = obj.abi

const HubBytecode = obj.bytecode

const HubAddress = process.env.HUB_ADDRESS

module.exports = {
  HubABI,
  HubBytecode,
  HubAddress
}
