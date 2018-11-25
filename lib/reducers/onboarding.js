import { ADD_DATA, VERIFY_USER } from '../constants/OnboardingConstants'

// Need to Define the initialState.
const initialState = {
  userData: {},
  verificationState: 'unverified'
}

function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_DATA:
      const userData = { ...state.userData, ...action.data }
      return { ...state, userData }
    case VERIFY_USER:
      return Object.assign({}, state, {verificationState: action.verificationState})
    default:
      return state
  }
}

export default onboardingReducer
