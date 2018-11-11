import { ADD_DATA } from '../constants/OnboardingConstants'

// Need to Define the initialState.
const initialState = {
  userData: {},
  verified: false
}

function onboardingReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_DATA:
      const userData = { ...state.userData, ...action.data }
      return { ...state, userData }
    default:
      return state
  }
}

export default onboardingReducer
