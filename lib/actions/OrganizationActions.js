import { GET_ORG, ORG_RECEIVED, GET_ORGS, ORGS_RECEIVED, ADD_ORG, ORG_ADDED, DELETE_ORG, ORG_DELETED } from 'circles-mobile/lib/constants/OrganizationConstants'

<<<<<<< HEAD
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
=======
export function getOrg (org) {
>>>>>>> create sagas for Organization, Update, User
  return {
    type: GET_ORG,
    org
  }
}

export function orgReceived (org) {
  return {
    type: ORG_RECEIVED,
<<<<<<< HEAD
    orgObj
>>>>>>> create actions and constants for api routes
=======
    org
>>>>>>> create sagas for Organization, Update, User
  }
}

export function getOrgs () {
  return {
    type: GET_ORGS
  }
}

<<<<<<< HEAD
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
=======
export function orgsReceived (orgsArr) {
>>>>>>> create sagas for Organization, Update, User
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
<<<<<<< HEAD
    orgObj
>>>>>>> create actions and constants for api routes
=======
    org
>>>>>>> create sagas for Organization, Update, User
  }
}
