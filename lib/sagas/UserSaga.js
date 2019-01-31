import { fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

import { ConsoleLogger } from '@aws-amplify/core'

import { hideLoadingSpinner, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { GET_USER, GET_USERS, ADD_USER, DELETE_USER } from 'circles-mobile/lib/constants/UserConstants'
import { userReceived, usersReceived, userAdded, userDeleted } from 'circles-mobile/lib/actions/UserActions'
const logger = new ConsoleLogger('User Saga')

const apiName = 'users'

export function * getUser () {
  while (true) {
    const action = yield take(GET_USER)
    const { userId } = action.org
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/' + userId
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.get(apiName, path, params)
      logger.debug('getUser GET response', response)
      yield put(userReceived(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * getUsers () {
  while (true) {
    const action = yield take(GET_USERS)
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
      logger.debug('getUsers GET response', response)
      yield put(usersReceived(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * addUser () {
  while (true) {
    const action = yield take(ADD_USER)
    const { userId } = action.org
    try {
      yield put(showLoadingSpinner())
      const cognitoUser = yield Auth.currentAuthenticatedUser()
      const token = cognitoUser.signInUserSession.accessToken.jwtToken
      const path = '/' + userId
      const params = {
        body: {},
        headers: {
          accessToken: token
        },
        response: true
      }
      let response = yield API.post(apiName, path, params)
      logger.debug('addUser POST response', response)
      yield put(userAdded(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

export function * deleteUser () {
  while (true) {
    const action = yield take(DELETE_USER)
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
      yield put(userDeleted(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

function * userSaga () {
  yield fork(getUser)
  yield fork(getUsers)
  yield fork(addUser)
  yield fork(deleteUser)
}

export default userSaga
