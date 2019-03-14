import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import { fonts } from 'circles-mobile/lib/styles'
import { Toast } from 'antd-mobile-rn'

// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

class OnboardingEmail extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      emailValid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.onProcess = this.onProcess.bind(this)
  }

  onProcess () {
    this.props.addOnboardingData({ email: this.state.email })
    this.props.navigation.push('Password')
  }

  handleChange (value) {
    var regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ((value && value.length < 6) || !regex.test(value)) {
      this.setState({ emailValid: false, email: value })
      Toast.fail('Please enter a valid email', 1)
    } else {
      this.setState({ emailValid: true, email: value })
    }
  }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'40%'}
        main={<OnboardingTextInput
          changeHandler={this.handleChange}
          label={'Email'}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />}
        nextButton
        buttonActive={this.state.emailValid}
        buttonPress={this.onProcess}
        footer={
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: fonts.primaryText,
            alignSelf: 'center',
            marginTop: 18
          }}>
            This field is required
          </Text>
        }
      />
    )
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OnboardingEmail)
