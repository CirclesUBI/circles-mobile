import { all } from 'redux-saga/effects'
import OnboardingSaga from './OnboardingSaga'
import AuthSaga from './AuthSaga'
<<<<<<< HEAD
<<<<<<< HEAD
import UserSaga from './UserSaga'
import OrganizationSaga from './OrganizationSaga'
import UpdateSaga from './UpdateSaga'
=======
>>>>>>> remove unecessary code, and format transaction for signing and sending
=======
import UserSaga from './UserSaga'
import OrganizationSaga from './OrganizationSaga'
import UpdateSaga from './UpdateSaga'
>>>>>>> create sagas for Organization, Update, User

export default function * rootSaga () {
  yield all([
    OnboardingSaga(),
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> create sagas for Organization, Update, User
    AuthSaga(),
    UserSaga(),
    OrganizationSaga(),
    UpdateSaga()
<<<<<<< HEAD
=======
    AuthSaga()
>>>>>>> remove unecessary code, and format transaction for signing and sending
=======
>>>>>>> create sagas for Organization, Update, User
  ])
}
