// import { PersonABI } from '../abi/Person'
<<<<<<< HEAD
import { HubABI, HubAddress } from '../abi/Hub'
=======
import { PersonFactoryABI, PersonFactoryAddress } from '../abi/PersonFactory'
>>>>>>> add contract files
// import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { ethers } from 'ethers'

export const customHttpProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

<<<<<<< HEAD
export const HubContract = new ethers.Contract(HubAddress, HubABI, customHttpProvider)

export default {
  ethers
}
=======
export const PersonFactoryContract = new ethers.Contract(PersonFactoryAddress, PersonFactoryABI, customHttpProvider)
>>>>>>> add contract files
