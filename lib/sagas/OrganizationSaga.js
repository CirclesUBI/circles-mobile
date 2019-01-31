import { fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'
import { hideLoadingSpinner, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { GET_ORG, GET_ORGS, ADD_ORG, DELETE_ORG } from 'circles-mobile/lib/constants/OrganizationConstants'
import { orgReceived, orgsReceived, orgAdded, orgDeleted } from 'circles-mobile/lib/actions/OrganizationActions'

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
      let response = yield API.get(apiName, path, params)
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
      let response = yield API.get(apiName, path, params)
      logger.debug('getOrgs GET response', response)
      yield put(orgsReceived(response.data))
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
      let response = yield API.post(apiName, path, params)
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
      let response = yield API.delete(apiName, path, params)
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
