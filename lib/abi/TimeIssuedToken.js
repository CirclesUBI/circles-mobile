let obj = require('../../contracts/build/contracts/TimeIssuedToken.json')

// const TimeIssuedTokenAddress = obj.networks['5777'].address

const TimeIssuedTokenABI = JSON.stringify(obj.abi)

const TimeIssuedTokenBytecode = obj.bytecode

module.exports = {
  // TimeIssuedTokenAddress,
  TimeIssuedTokenABI,
  TimeIssuedTokenBytecode
}
