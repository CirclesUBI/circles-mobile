// import { ITEM_ADDED } from 'circles-mobile/lib/constants/UserConstants'
import { WALLET_SELECTED, TRANSACTION_WALLET_SELECTED, USER_RECEIVED, USERS_RECEIVED, USER_ADDED, USER_DELETED } from 'circles-mobile/lib/constants/UserConstants'
import { ADD_COGNITO_USER_DATA, ADD_DB_USER_DATA } from 'circles-mobile/lib/constants/AuthConstants'
import { OWN_ORGS_RECEIVED } from 'circles-mobile/lib/constants/OrganizationConstants'

let initialState = {
  address: '0x',
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
    // Why are there 2 here
    case ADD_COGNITO_USER_DATA:
      user = action.cognitoUser.attributes
      return Object.assign({}, state, {
        ...user,
        picture: { uri: user.picture },
        selectedWallet: user.display_name
      })
    case ADD_DB_USER_DATA:
      user = action.dbUser
      return Object.assign({}, state, {
        ...user,
        picture: { uri: user.profile_pic_url },
        selectedWallet: user.display_name
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
