// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { LinearGradient } from 'expo'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import { finishOnboarding } from '../../actions/OnboardingActions'
import {
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
// Styles
import { primary, background1, secondary, width, fonts, textColor1 } from 'circles-mobile/lib/styles'

const styles = StyleSheet.create({
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    width: width / 2,
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export class OnboardingComplete extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.translate = translate
    this.onContinue = this.onContinue.bind(this)
  }

  onContinue () {
    // we redirect to HomeScreen after we set the agreeToDisclaimer flag = true
    this.props.finishOnboarding()
  }

  render () {
    const finishedText = this.translate("Congratulations! You've successfully created your account.")
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
              <View style={{ alignItems: 'center'}}>
                <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
                  this.props.navigation.navigate('Contacts')
                }}>
                  <View>
                    <Text style={[styles.loginText, {textAlign: 'center'}]}>{this.translate('FIND CIRCLES CONTACTS')}</Text>
                  </View>
                </TouchableHighlight>
              </View>
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

OnboardingComplete.contextTypes = {
  t: PropTypes.func.isRequired
}

export const mapDispatchToProps = (dispatch) => {
  return {
    finishOnboarding: () => {
      dispatch(finishOnboarding())
    }
  }
}

export default connect(null, mapDispatchToProps)(OnboardingComplete)
