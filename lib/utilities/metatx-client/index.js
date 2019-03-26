import { ethers } from 'ethers'
import utilities from './utilities'
import CryptoJS from 'crypto-js'

export default class MetaTx {
  // provider needs to be generated with ethers.js
  // relayContractAdress needs to be a contract of type TODO use uport github link
  constructor (
    provider,
    relayAddress,
    relayABI,
    relayFnName = 'relayMetaTx',
    whitelistAddress = '0x0000000000000000000000000000000000000000'
  ) {
    this.provider = provider
    this.relayAddress = relayAddress
    this.relayABI = relayABI
    this.relayFnName = relayFnName
    this.whitelistAddress = whitelistAddress
    this.relayContract = new ethers.Contract(relayAddress, relayABI, provider)
    this.testing = 'hello'
  }

  async _getNonce (senderAddress) {
    return ethers.utils.hexlify(await this.relayContract.getNonce(senderAddress))
  }

  _generateRelayContractTx (userAddress, destination, data, relayNonce) {
    // Tight packing, as Solidity sha3 does
    let hashInput = '0x1900' + utilities.strip0x(this.relayAddress) +
      utilities.strip0x(this.whitelistAddress) + utilities.pad(relayNonce) + utilities.strip0x(destination) + utilities.strip0x(data)
    return ethers.utils.keccak256(hashInput)
  }

  _generateSignatureArgs (privKey, hash, to, data) {
    let signingKey = new ethers.utils.SigningKey(privKey)
    let sig = signingKey.signDigest(hash)
    return [ sig.v,
      sig.r,
      sig.s,
      to,
      data,
      this.whitelistAddress
    ]
  }

  _getTypesFromAbi (abi, functionName) {
    function matchesFunctionName (json) {
      return (json.name === functionName && json.type === 'function')
    }

    function getTypes (json) {
      return json.type
    }

    let funcJson = abi.filter(matchesFunctionName)[0]

    return (funcJson.inputs).map(getTypes)
  }

  _encodeFunctionTxData (functionName, types, args) {
    let fullName = functionName + '(' + types.join() + ')'
    let signature = CryptoJS.SHA3(fullName, { outputLength: 256 }).toString(CryptoJS.enc.Hex).slice(0, 8)
    let dataHex = signature + ethers.utils.defaultAbiCoder.encode(types, args).slice(2)

    return dataHex
  }

  async _generateMetaTxData (
    keyPair,
    to,
    data,
    relayNonce
  ) {
    let hash = this._generateRelayContractTx(keyPair.address, to, data, relayNonce)
    let signatureArgs = this._generateSignatureArgs(keyPair.privateKey, hash, to, data)
    let abi = this.relayContract.interface.abi
    let types = this._getTypesFromAbi(abi, this.relayFnName)
    return this._encodeFunctionTxData(this.relayFnName, types, signatureArgs)
  }

  async _generateMetaTxObject (
    txData,
    relayNonce
  ) {
    let txObject = {}
    txObject.to = utilities.add0x(this.relayContract.address)
    txObject.gasPrice = await this.provider.getGasPrice()
    txObject.gasLimit = 1600000
    txObject.nonce = utilities.add0x(relayNonce)
    txObject.data = utilities.add0x(txData)
    txObject.value = utilities.add0x(ethers.utils.hexlify(0))
    return txObject
  }

  // keyPair is an object with keys of (privateKey, publicKey, address)
  // to is the address of the contract being sent the parsed metaTx
  // data is the tx data to include in the fn call to the destination contract
  async generateMetaTxHash (keyPair, to, data) {
    let relayNonce = await this._getNonce(keyPair.address)
    let txData = await this._generateMetaTxData(keyPair, to, data, relayNonce)
    let txObject = await this._generateMetaTxObject(txData, relayNonce)
    return ethers.utils.serializeTransaction(txObject)
  }
}
