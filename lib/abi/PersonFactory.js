let obj = require('../../contracts/build/contracts/PersonFactory.json')

const PersonFactoryAddress = obj.networks['5777'].address

const PersonFactoryABI = obj.abi

const PersonFactoryBytecode = obj.bytecode

module.exports = {
  PersonFactoryAddress,
  PersonFactoryABI,
  PersonFactoryBytecode
}