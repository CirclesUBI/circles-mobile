import React from 'react'
import {
  KeyboardAvoidingView,
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import OnboardingNavBar from './OnboardingNavBar'
import NextButton from './OnboardingNextButton'
import { secondary, width } from 'circles-mobile/lib/styles'

const OnboardingScreenComponent = ({
  navigation,
  progressAmount,
  main,
  footer,
  nextButton,
  buttonActive,
  buttonPress
}) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center' }} behavior='padding'>
      <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
        <OnboardingNavBar navigation={navigation} progressAmount={progressAmount} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.75 }}>
            {main}
          </View>
          <View style={{ flex: 0.25, justifyContent: 'flex-end' }}>
            {nextButton
              ? <NextButton active={buttonActive} onPress={buttonPress} />
              : null
            }
            {footer}
            <View style={{ height: 40 }} />
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

export default OnboardingScreenComponent
