import { PersonABI } from '../abi/Person'
import { PersonFactoryABI, PersonFactoryAddress } from '../abi/PersonFactory'
import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { ethers } from 'ethers'

// let currentProvider = new ethers.providers.HttpProvider('http://localhost:9545')
// const web3Provider = new ethers.providers.Web3Provider(currentProvider)
export const customHttpProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

export const PersonFactoryContract = new ethers.Contract(PersonFactoryAddress, PersonFactoryABI, customHttpProvider)
// export const Person = contract({abi: JSON.parse(PersonABI)})
//
// const PersonFactoryContract = new ethers.Contract(PersonFactoryAddress, JSON.parse(PersonFactoryABI), web3Provider)
// const TimeIssuedToken = contract({abi: JSON.parse(TimeIssuedTokenABI)})

// console.log('hello', PersonFactoryContract)
// export default { customHttpProvider }
