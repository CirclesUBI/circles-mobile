import { ADD_RECOVERY_DATA, FINISH_RECOVERY, SET_VERIFICATION_STATE, WIPE_RECOVERY_DATA } from '../constants/RecoveryConstants'

export function addRecoveryData (data) {
  return {
    type: ADD_RECOVERY_DATA,
    data
  }
}

export function wipeRecoveryData () {
  return {
    type: WIPE_RECOVERY_DATA
  }
}

export function finishRecovery (userCredentials) {
  return {
    type: FINISH_RECOVERY,
    userCredentials
  }
}

export function setVerificationState (verificationState) {
  return {
    type: SET_VERIFICATION_STATE,
    verificationState
  }
}
