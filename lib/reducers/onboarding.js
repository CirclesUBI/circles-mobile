import { ADD_ONBOARDING_DATA, SET_VERIFICATION_STATE, WIPE_ONBOARDING_DATA } from '../constants/OnboardingConstants'

// Need to Define the initialState.
const initialState = {
  userData: {},
  verificationState: 'unverified'
}

function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_ONBOARDING_DATA:
      const userData = { ...state.userData, ...action.data }
      return { ...state, userData }
    case WIPE_ONBOARDING_DATA:
      return initialState
    case SET_VERIFICATION_STATE:      
      const verifState = {verificationState: action.verificationState}
      console.log('verifState', verifState)
      return { ...state, verifState}
    default:
      return state
  }
}

export default onboardingReducer
