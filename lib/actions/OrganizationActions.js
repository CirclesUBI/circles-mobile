import { GET_ORG, ORG_RECEIVED, GET_ORGS, ORGS_RECEIVED, GET_OWN_ORGS, OWN_ORGS_RECEIVED, ADD_ORG, ORG_ADDED, DELETE_ORG, ORG_DELETED } from 'circles-mobile/lib/constants/OrganizationConstants'

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
  }
}

export function getOrgs () {
  return {
    type: GET_ORGS
  }
}

export function orgsReceived (orgsArr) {
  return {
    type: ORGS_RECEIVED,
    orgsArr
  }
}

export function getOwnOrgs (userId) {
  return {
    type: GET_OWN_ORGS
  }
}

export function ownOrgsReceived (orgsArr) {
  return {
    type: OWN_ORGS_RECEIVED,
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
  }
}
