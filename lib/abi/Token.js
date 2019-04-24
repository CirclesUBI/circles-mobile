let obj = require('../../contracts/build/contracts/Token.json')

const TokenABI = obj.abi

const TokenBytecode = obj.bytecode

module.exports = {
  TokenABI,
  TokenBytecode
}
