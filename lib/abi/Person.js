let obj = require('../../contracts/build/contracts/Person.json')

const PersonABI = obj.abi

const PersonBytecode = obj.bytecode

module.exports = {
  // PersonAddress,
  PersonABI,
  PersonBytecode
}
