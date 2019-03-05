/* global fetch */
import { fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'
import { hideLoadingSpinner, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { GET_ORG, GET_ORGS, GET_OWN_ORGS, ADD_ORG, DELETE_ORG } from 'circles-mobile/lib/constants/OrganizationConstants'
import { orgReceived, orgsReceived, ownOrgsReceived, orgAdded, orgDeleted } from 'circles-mobile/lib/actions/OrganizationActions'

const logger = new ConsoleLogger('Organization Saga')

const apiName = 'orgs'

export function * getOrg () {
  while (true) {
    const action = yield take(GET_ORG)
    const { orgId } = action.org
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/' + orgId
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.get('orgs', path, params)
      logger.debug('getOrg GET response', response)
      yield put(orgReceived(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * getOrgs () {
  while (true) {
    const action = yield take(GET_ORGS)
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/'
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.get('orgs', path, params)
      let orgs = yield response.json()
      logger.debug('getOrgs GET response', response)
      yield put(orgsReceived(orgs))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * getOwnOrgs () {
  while (true) {
    const action = yield take(GET_OWN_ORGS)
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/'
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.get('orgs', path, params)
      let orgs = yield response.json()
      logger.debug('getOrgs GET response', response)
      yield put(ownOrgsReceived(orgs))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * addOrg () {
  while (true) {
    const action = yield take(ADD_ORG)
    const { orgId } = action.org
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/' + orgId
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.post('orgs', path, params)
      logger.debug('addOrg POST response', response)
      yield put(orgAdded(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * deleteOrg () {
  while (true) {
    const action = yield take(DELETE_ORG)
    const { orgId } = action.org
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/' + orgId
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.delete('orgs', path, params)
      logger.debug('addOrg POST response', response)
      yield put(orgDeleted(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

function * organizationSaga () {
  yield fork(getOrg)
  yield fork(getOrgs)
  yield fork(addOrg)
  yield fork(deleteOrg)
}

export default organizationSaga

// get orgs
// let response = yield fetch('http://localhost:8080/v1.1.2/orgs/')

// get own orgs
// let response = yield fetch('http://localhost:8080/v1.1.2/orgs/user')

// add org
// let response = yield fetch('http://localhost:8080/v1.1.2/orgs/', {
//   method: "POST", // *GET, POST, PUT, DELETE, etc.
//   mode: "cors", // no-cors, cors, *same-origin
//   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: "same-origin", // include, *same-origin, omit
//   headers: {
//       "Content-Type": "application/json",
//       // "Content-Type": "application/x-www-form-urlencoded",
//   },
//   redirect: "follow", // manual, *follow, error
//   referrer: "no-referrer", // no-referrer, *client
//   body: JSON.stringify(action.org), // body data type must match "Content-Type" header
// })
// console.log('response', response)
