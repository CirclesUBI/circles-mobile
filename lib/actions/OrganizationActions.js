import { GET_ORG, ORG_RECEIVED, GET_ORGS, ORGS_RECEIVED, ADD_ORG, ORG_ADDED, DELETE_ORG, ORG_DELETED } from 'circles-mobile/lib/constants/OrganizationConstants'

<<<<<<< HEAD
export function getOrg (org) {
  return {
    type: GET_ORG,
    org
  }
}

export function orgReceived (org) {
  return {
    type: ORG_RECEIVED,
    org
=======
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
>>>>>>> create actions and constants for api routes
  }
}

export function getOrgs () {
  return {
    type: GET_ORGS
  }
}

<<<<<<< HEAD
export function orgsReceived (orgsArr) {
  return {
    type: ORGS_RECEIVED,
    orgsArr
  }
}

export function addOrg (org) {
  return {
    type: ADD_ORG,
    org
  }
}

export function orgAdded (org) {
  return {
    type: ORG_ADDED,
    org
  }
}

export function deleteOrg (org) {
  return {
    type: DELETE_ORG,
    org
  }
}

export function orgDeleted (org) {
  return {
    type: ORG_DELETED,
    org
=======
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
>>>>>>> create actions and constants for api routes
  }
}
