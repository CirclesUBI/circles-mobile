import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import { fonts } from 'circles-mobile/lib/styles'
// import { Toast } from 'antd-mobile-rn'

class OnboardingConfirmPassword extends React.Component {
  constructor  (props, {t: translate}) {
    super(props)
    this.state = {
      password: ''
    }
    this.translate = translate
    this.onProcess = this.onProcess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onProcess () {
    this.props.navigation.push('Phone')
  }

  handleChange (value) {
    value = value.trim()
    this.setState({ password: value })
  }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'60%'}
        main={<OnboardingTextInput
          changeHandler={this.handleChange}
          label={this.translate('Confirm Password')}
          placeholder={this.translate('Confirm Password')}
          textContentType='password'
          secureTextEntry
        />}
        nextButton
        buttonActive={this.state.password === this.props.userData.password}
        buttonPress={this.onProcess}
        footer={
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: fonts.primaryText,
            alignSelf: 'center',
            marginTop: 18
          }}>
            {this.translate('This field is required')}
          </Text>
        }
      />
    )
  }
}

OnboardingConfirmPassword.contextTypes = {
  t: PropTypes.func.isRequired
}

export const mapStateToProps = state => (
  {
    userData: state.onboarding.userData
  }
)

export default connect(
  mapStateToProps
)(OnboardingConfirmPassword)
