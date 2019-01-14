// import { PersonABI } from '../abi/Person'
<<<<<<< HEAD
<<<<<<< HEAD
import { HubABI, HubAddress } from '../abi/Hub'
=======
import { PersonFactoryABI, PersonFactoryAddress } from '../abi/PersonFactory'
>>>>>>> add contract files
=======
import { HubABI, HubAddress } from '../abi/Hub'
>>>>>>> update contract names"
// import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { ethers } from 'ethers'

export const customHttpProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update contract names"
export const HubContract = new ethers.Contract(HubAddress, HubABI, customHttpProvider)

export default {
  ethers
}
<<<<<<< HEAD
=======
export const PersonFactoryContract = new ethers.Contract(PersonFactoryAddress, PersonFactoryABI, customHttpProvider)
>>>>>>> add contract files
=======
>>>>>>> update contract names"
