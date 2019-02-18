import { ORG_RECEIVED, ORGS_RECEIVED, ORG_ADDED, ORG_DELETED } from 'circles-mobile/lib/constants/OrganizationConstants'

let initialState = {}

export default function organizationReducer (state = initialState, action) {
  let id
  switch (action.type) {
    case ORG_RECEIVED:
      return Object.assign({}, state, action.org)
    case ORGS_RECEIVED:
      let orgs = {}
      action.orgsArr.forEach(function (item) { orgs[item.id] = item })
      return orgs
    case ORG_ADDED:
      id = action.org.id
      return Object.assign({}, state, { [id]: action.org })
    case ORG_DELETED:
      id = action.org.id
      return Object.assign({}, state, { [id]: null })
    default:
      return state
  }
}