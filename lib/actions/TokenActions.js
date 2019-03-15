import { GET_TOKEN_DATA } from 'circles-mobile/lib/constants/TokenConstants'

export function getTokenData (tokenAddress) {
  return {
    type: GET_TOKEN_DATA,
    tokenAddress
  }
}
