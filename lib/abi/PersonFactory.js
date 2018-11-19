let obj = require('../../contracts/build/contracts/PersonFactory.json')

const PersonFactoryAddress = obj.networks['1542656513047'].address

const PersonFactoryABI = JSON.stringify(obj.abi)

const PersonFactoryBytecode = obj.bytecode

module.exports = {
  PersonFactoryAddress,
  PersonFactoryABI,
  PersonFactoryBytecode
}
