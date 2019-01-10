let obj = require('../../contracts/build/contracts/Person.json')

// const PersonAddress = obj.networks['5777'].address

const PersonABI = obj.abi

const PersonBytecode = obj.bytecode

module.exports = {
  // PersonAddress,
  PersonABI,
  PersonBytecode
}
