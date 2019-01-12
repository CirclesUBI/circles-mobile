import { all } from 'redux-saga/effects'
import OnboardingSaga from './OnboardingSaga'
import AuthSaga from './AuthSaga'
<<<<<<< HEAD
import UserSaga from './UserSaga'
import OrganizationSaga from './OrganizationSaga'
import UpdateSaga from './UpdateSaga'
=======
>>>>>>> remove unecessary code, and format transaction for signing and sending

export default function * rootSaga () {
  yield all([
    OnboardingSaga(),
<<<<<<< HEAD
    AuthSaga(),
    UserSaga(),
    OrganizationSaga(),
    UpdateSaga()
=======
    AuthSaga()
>>>>>>> remove unecessary code, and format transaction for signing and sending
  ])
}
