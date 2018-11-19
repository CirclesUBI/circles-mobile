import { PersonABI } from '../abi/Person'
import { TimeIssuedTokenABI } from '../abi/TimeIssuedToken'
import { PersonFactoryABI, PersonFactoryAddress } from '../abi/PersonFactory'

import Web3 from 'web3'
import contract from 'truffle-contract'

export const web3 = new Web3('http://127.0.0.1:9545/')

export const eth = web3.eth

export const Person = contract({abi: JSON.parse(PersonABI)})

const PersonFactory = contract({abi: JSON.parse(PersonFactoryABI)})
export const PersonFactoryContract = PersonFactory.at(PersonFactoryAddress)

export const TimeIssuedToken = contract({abi: JSON.parse(TimeIssuedTokenABI)})

function provideProvider (address) {
  Person.setProvider(address)
  TimeIssuedToken.setProvider(address)
  PersonFactory.setProvider(address)
}

provideProvider('http://127.0.0.1:9545/')
