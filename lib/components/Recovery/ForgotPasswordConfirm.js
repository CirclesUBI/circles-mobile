// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'

// Actions
import { confirmForgotPassword } from 'circles-mobile/lib/actions/AuthActions'

import { ConsoleLogger } from '@aws-amplify/core'

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

  onContinue () {
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
    value = value.trim() // todo: are spaces allowed in passwords?
    if (value === this.props.recoveryData.password)
      this.setState({ password: value })
  }

  render () {
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
            <NextButton active={this.state.password} onPress={this.onContinue} />
          </View>
        </LinearGradient>
      </View>        
    )
  }
}

const mapStateToProps = state => {
  return {
    recoveryData: state.recovery.recoveryData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    confirmForgotPassword: data => {
      dispatch(confirmForgotPassword(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordConfirm)
