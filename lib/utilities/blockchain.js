// import { PersonABI } from '../abi/Person'
import { HubABI, HubAddress } from '../abi/Hub'
// import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { ethers } from 'ethers'

export const customHttpProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')

// export const HubContract = new ethers.Contract(HubAddress, HubABI, customHttpProvider)

export default {
  ethers
}
