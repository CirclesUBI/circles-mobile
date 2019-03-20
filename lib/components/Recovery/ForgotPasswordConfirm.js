// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'

// Actions
import { setVerificationState } from '../../actions/OnboardingActions'
import { confirmForgotPassword } from 'circles-mobile/lib/actions/AuthActions'

import { ConsoleLogger } from '@aws-amplify/core'
import { Auth } from 'aws-amplify'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

const logger = new ConsoleLogger('ForgotPasswordConfirm')

export class ForgotPasswordConfirm extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      password: ''
    }
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async onContinue () {
    if (this.state.password != this.props.recoveryData.password)
      logger.warn('passwords dont match')
    else if (this.state.password) {
      try {
        this.props.confirmForgotPassword({
          username: this.props.recoveryData.username,
          code: this.props.recoveryData.code, 
          password: this.state.password
        })
      } catch(err) {
        logger.error(err)
      }    
    }    
  }

  handleChange (value) {
    value = value.trim()
    this.setState({ password: value })
  }

  render () {
    const showButton = this.props.verificationState === 'verified'
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <OnboardingTextInput
              changeHandler={this.handleChange}
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
              textContentType='password'
              secureTextEntry
            />
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontFamily: fonts.primaryText,
              alignSelf: 'center',
              marginTop: 18
            }}>
              This field is required
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active onPress={this.onContinue} />
          </View>
        </LinearGradient>
      </View>        
    )
  }
}

const mapStateToProps = state => {
  return {
    verificationState: state.recovery.verificationState,
    recoveryData: state.recovery.recoveryData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    setVerificationState: (verificationState) => {
      dispatch(setVerificationState(verificationState))
    },
    addRecoveryData: data => {
      dispatch(addRecoveryData(data))
    },
    confirmForgotPassword: data => {
      dispatch(confirmForgotPassword(data))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordConfirm)

/* <TouchableOpacity
  disabled={this.props.offline || this.props.calling}
  onPress={this.handlePhoneCall}
  style={{ alignSelf: 'center', marginTop: 15 }}
>
  <Text infoButtonLabel style={{ color: textColor2 }}>
    Call Me
  </Text>
</TouchableOpacity>
*/