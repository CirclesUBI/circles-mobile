// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { USER_TOKEN_CREATED, USER_RECEIVED, USERS_RECEIVED, USER_ADDED, USER_DELETED } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_DB_USER_DATA } from 'circles-mobile/lib/constants/AuthConstants'
import { OWN_ORGS_RECEIVED } from 'circles-mobile/lib/constants/OrganizationConstants'
import { HubContract } from 'circles-mobile/lib/utilities/blockchain'

let initialState = {
  agreed_to_disclaimer: false,
  username: '',
  name: '',
  picture: '',
  phone_number: '',
  email: '',
  id: '',
  orgs: {}
}

export default function userReducer (state = initialState, action) {
  let id, user, orgs
  switch (action.type) {
    case ADD_DB_USER_DATA:
      user = action.dbUser
      return Object.assign({}, state, {
        ...user,
        picture: { uri: user.profile_pic_url },
        selectedWallet: user.wallet_address
      })
    case USER_RECEIVED:
      return Object.assign({}, state, action.user)
    case USERS_RECEIVED:
      let users = {}
      action.usersArr.forEach(function (item) { users[item.id] = item })
      return users
    case USER_ADDED:
      // id = action.org.id
      // return Object.assign({}, state, { [id]: action.user })
      return state
    case USER_TOKEN_CREATED:
      let logs = action.txReceipt.data.logs
      logs = logs.filter(log => log.address.toLowerCase() === HubContract.address.toLowerCase())
      let userAddress = '0x' + logs[0].topics[1].substr(-40)
      let tokenAddress = '0x' + logs[0].topics[2].substr(-40)
      return Object.assign({}, state, { token_address: tokenAddress })
    case USER_DELETED:
      // id = action.org.id
      // return Object.assign({}, state, { [id]: null })
      return state
    case OWN_ORGS_RECEIVED:
      orgs = {}
      Array.isArray(action.orgsArr) && Object.keys(action.orgsArr).forEach(function (item) { orgs[item.id] = item })
      return Object.assign({}, state, { orgs })
    default:
      return state
  }
}
