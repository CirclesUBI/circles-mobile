import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import TermsAndConditions from '../Settings/TermsAndConditions'
// import { OnboardingButton } from '../shared/Button'
import { Text } from '../shared'
// import { connectTheme, defaultTheme } from 'uPortMobile/lib/styles'

export const OnboardingTerms = (props, context) => {
  // const { styles } = context.theme ? context.theme : defaultTheme
  let nextScreen
  switch (props.antiSybilVerificationFlag) {
    case 'funCaptcha':
      nextScreen = 'onboarding.funCaptcha'
      break
    case 'reCaptcha':
      nextScreen = 'onboarding.reCaptcha'
      break
    default: // phone and phoneAndFunCaptcha
      nextScreen = 'onboarding.phone'
      break
  }
  return (
    <View style={{flex: 1}}>
      <Text title> Terms and Conditions</Text>
      <TermsAndConditions defaultPadding={false} />
      {/* <OnboardingButton
        onPress={() => props.navigator.push({
          screen: nextScreen,
          navigatorStyle: {
            navBarHidden: true
          }})}
      >
        Accept
      </OnboardingButton> */}
    </View>
  )
}

OnboardingTerms.contextTypes = {
  theme: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    antiSybilVerificationFlag: state.flags.antiSybilVerification
  }
}

// export const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// }
export default connect(mapStateToProps)(OnboardingTerms)
