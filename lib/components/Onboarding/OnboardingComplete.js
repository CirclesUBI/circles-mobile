// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
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
  constructor (props, {t: translate}) {
    super(props)
    this.translate = translate
    this.onContinue = this.onContinue.bind(this)
  }

  onContinue () {
    // we redirect to HomeScreen after we set the agreeToDisclaimer flag = true
    this.props.finishOnboarding({ username: this.props.userData.username, password: this.props.userData.password })
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
                marginTop: 40,
                textAlign: 'center',
                fontSize: 18,
                marginLeft: 30,
                marginRight: 30
              }}>
                {finishedText}
              </Text>
              <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
                props.navigation.navigate('Contacts')
              }}>
                <View>
                  <Text style={[styles.loginText, {textAlign: 'center'}]}>{translate('FIND CIRCLES CONTACTS')}</Text>
                </View>
              </TouchableHighlight>
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
    finishOnboarding: (userCredentials) => {
      dispatch(finishOnboarding(userCredentials))
    }
  }
}

export const mapStateToProps = state => (
  {
    userData: state.onboarding.userData
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingComplete)
