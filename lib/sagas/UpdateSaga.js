import { fork, put, take } from 'redux-saga/effects'
import Auth from '@aws-amplify/auth'
import API from '@aws-amplify/api'

import { ConsoleLogger } from '@aws-amplify/core'

import { hideLoadingSpinner, showLoadingSpinner } from 'circles-mobile/lib/actions/AppActions'
import { GET_NOTIFICATIONS } from 'circles-mobile/lib/constants/UpdateConstants'
import { notificationsReceived } from 'circles-mobile/lib/actions/UpdateActions'

const logger = new ConsoleLogger('Update Saga')

const apiName = 'notifs'

export function * getNotifications () {
  while (true) {
    const action = yield take(GET_NOTIFICATIONS)
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
      logger.debug('getNotifications GET response', response)
      yield put(notificationsReceived(response.data))
    } catch (err) {
      logger.error(err)
    } finally {
      yield put(hideLoadingSpinner())
    }
  }
}

function * updateSaga () {
  yield fork(getNotifications)
}

export default updateSaga
