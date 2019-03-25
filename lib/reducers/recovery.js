import { ADD_RECOVERY_DATA, SET_VERIFICATION_STATE, WIPE_RECOVERY_DATA } from '../constants/RecoveryConstants'

// Need to Define the initialState.
const initialState = {
  recoveryData: '',
  verificationState: 'unverified'
}

function recoveryReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_RECOVERY_DATA:
      const recoveryData = { ...state.recoveryData, ...action.data}
      return Object.assign({}, state, { recoveryData })
    case WIPE_RECOVERY_DATA:
      return initialState
    case SET_VERIFICATION_STATE:
      return Object.assign({}, state, { verificationState: action.verificationState })
    default:
      return state
  }
}

export default recoveryReducer
