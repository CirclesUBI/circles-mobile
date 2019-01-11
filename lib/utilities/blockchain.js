// import { PersonABI } from '../abi/Person'
import { PersonFactoryABI, PersonFactoryAddress } from '../abi/PersonFactory'
// import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { ethers } from 'ethers'

export const customHttpProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

export const PersonFactoryContract = new ethers.Contract(PersonFactoryAddress, PersonFactoryABI, customHttpProvider)
