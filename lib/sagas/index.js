import { all } from 'redux-saga/effects'
import OnboardingSaga from './OnboardingSaga'
import AuthSaga from './AuthSaga'

export default function * rootSaga () {
  yield all([
    OnboardingSaga(),
    AuthSaga()
  ])
}
