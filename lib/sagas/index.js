import { all } from 'redux-saga/effects'
import OnboardingSaga from './OnboardingSaga'
import AuthSaga from './AuthSaga'
import UserSaga from './UserSaga'
import OrganizationSaga from './OrganizationSaga'
import UpdateSaga from './UpdateSaga'
import TokenSaga from './TokenSaga'
import SettingsSaga from './SettingsSaga'

export default function * rootSaga () {
  yield all([
    OnboardingSaga(),
    AuthSaga(),
    UserSaga(),
    OrganizationSaga(),
    UpdateSaga(),
    TokenSaga(),
    SettingsSaga()
  ])
}
