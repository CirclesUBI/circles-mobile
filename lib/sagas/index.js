import { all } from 'redux-saga/effects'
// import startupSaga from './startupSaga'
// import handleRequestSaga from './requests'
// import identitySaga from './identitySaga'
// import personaSaga from './persona'
import OnboardingSaga from './OnboardingSaga'
import AuthSaga from './AuthSaga'
// import unnuSaga from './unnu'
// import blockchainSaga from './blockchain'
// import networkState from './networkState'
// import notificationRegistrationSaga from './notifications'
// import onfidoSaga from './onfido'
// import recoverySaga from './recoverySaga'
// import stateSaver from './stateSaver'
// import encryptionSaga from './encryption'
// import pututuSaga from './pututu'
// import featureFlagsSaga from './featureFlagsSaga'
// import metricsSaga from './metrics'
// import keychainSaga from './keychain'

export default function * rootSaga () {
  yield all([
    // featureFlagsSaga(),
    // metricsSaga(),
    // startupSaga(),
    // stateSaver(),
    // identitySaga(),
    // networkState(),
    // handleRequestSaga(),
    // personaSaga(),
    OnboardingSaga(),
    AuthSaga()
    // unnuSaga(),
    // blockchainSaga(),
    // notificationRegistrationSaga(),
    // recoverySaga(),
    // encryptionSaga(),
    // onfidoSaga(),
    // pututuSaga(),
    // keychainSaga()
  ])
}
