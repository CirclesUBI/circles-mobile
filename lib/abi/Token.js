let obj = require('../../contracts/build/contracts/Token.json')

const TokenABI = obj.abi

const TokenBytecode = obj.bytecode

const TokenAddress = obj.networks['5777'].address

module.exports = {
  // PersonAddress,
  TokenABI,
  TokenBytecode,
  TokenAddress
}
