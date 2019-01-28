import { GET_ORG, ORG_RECEIVED, GET_ORGS, ORGS_RECEIVED, ADD_ORG, ORG_ADDED, DELETE_ORG, ORG_DELETED } from 'circles-mobile/lib/constants/OrganizationConstants'

export function getOrg (orgObj) {
  return {
    type: GET_ORG,
    orgObj
  }
}

export function orgReceived (orgObj) {
  return {
    type: ORG_RECEIVED,
    orgObj
  }
}

export function getOrgs () {
  return {
    type: GET_ORGS
  }
}

export function orgsReceived (orgArr) {
  return {
    type: ORGS_RECEIVED,
    orgArr
  }
}

export function addOrg (orgObj) {
  return {
    type: ADD_ORG,
    orgObj
  }
}

export function orgAdded (orgObj) {
  return {
    type: ORG_ADDED,
    orgObj
  }
}

export function deleteOrg (orgObj) {
  return {
    type: DELETE_ORG,
    orgObj
  }
}

export function orgDeleted (orgObj) {
  return {
    type: ORG_DELETED,
    orgObj
  }
}
