// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import { finishOnboarding } from '../../actions/OnboardingActions'

// Styles
import { background1, secondary, width, fonts, textColor1 } from 'circles-mobile/lib/styles'

export class OnboardingComplete extends React.Component {
  constructor (props) {
    super(props)
    this.onContinue = this.onContinue.bind(this)
  }

  onContinue () {
    // we redirect to HomeScreen after we set the agreeToDisclaimer flag = true
    this.props.finishOnboarding()
  }

  render () {
    const finishedText = 'Congratulations! You\'ve successfully created your account.'
    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View style={{ alignItems: 'center', marginTop: '40%' }}>
                <Image
                  source={require('circles-mobile/images/logo.png')} />
              </View>
              <Text style={{
                fontFamily: fonts.boldText,
                color: textColor1,
                marginTop: 60,
                textAlign: 'center',
                fontSize: 18,
                marginLeft: 30,
                marginRight: 30
              }}>
                {finishedText}
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <NextButton active onPress={this.onContinue} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    finishOnboarding: () => {
      dispatch(finishOnboarding())
    }
  }
}

export default connect(null, mapDispatchToProps)(OnboardingComplete)
