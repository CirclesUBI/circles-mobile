import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import { fonts } from 'circles-mobile/lib/styles'
// import { Toast } from 'antd-mobile-rn'

// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

const PasswordCheck = (props) => (
  <Text style={{
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.primaryText,
    alignSelf: 'center',
    marginTop: 5
  }}>
    {props.check}
  </Text>
)
class OnboardingPassword extends React.Component {
  constructor () {
    super()
    this.state = {
      password: '',
      passwordValid: false,
      passwordStrength: {
        uppercase: false,
        lowecase: false,
        digit: false,
        length: false,
        special: false
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.onProcess = this.onProcess.bind(this)
  }

  onProcess () {
    this.props.addOnboardingData({ password: this.state.password })
    this.props.navigation.push('ConfirmPassword')
  }

  handleChange (value) {
    value = value.trim()
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let hasEnoughChars = (value.length >= 8)
    let hasUpperCase = /[A-Z]/.test(value)
    let hasLowerCase = /[a-z]/.test(value)
    let hasNumber = /\d+/.test(value)
    let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value) // Is this a comprehensive list of special chars?
    this.setState({
      passwordValid: regex.test(value),
      password: value,
      passwordStrength: {
        uppercase: hasUpperCase,
        lowercase: hasLowerCase,
        digit: hasNumber,
        length: hasEnoughChars,
        special: hasSpecialChar
      }
    })
  }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'50%'}
        main={
          <View style={{ flex: 1 }}>
            <OnboardingTextInput
              changeHandler={this.handleChange}
              label={'Password'}
              placeholder={'Password'}
              textContentType='password'
              secureTextEntry
              onChangeText={value => this.handleChange(value)} /* needs test */
              style={{ marginTop: '35%' }}
              // onEndEditing={this.onProcessPassword}
            />
            {/* <TextInput
              style={{
                width: calculateWidthRatio(285),
                color: 'white',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                borderBottomWidth: 1,
                marginTop: '40%',
                alignSelf: 'center',
                textAlign: 'left',
                borderColor: 'white',
                paddingBottom: 10
              }}
              onChangeText={value => this.handleChange(value)}
              onEndEditing={this.onProcessPassword}
              value={this.state.password}
              label='Password'
              placeholder='Password'
              placeholderTextColor='white'
              autofocus
              autoCapitalize='none'
              returnKeyType='next'
              textContentType='password'
              secureTextEntry
            /> */}
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontFamily: fonts.primaryText,
              alignSelf: 'center',
              marginTop: 18
            }}>
              {this.state.passwordStrength.uppercase &&
                this.state.passwordStrength.lowercase &&
                this.state.passwordStrength.digit &&
                this.state.passwordStrength.special &&
                this.state.passwordStrength.length
                ? 'Password is sufficiently strong'
                : 'Password must contain at least:'
              }
            </Text>
            {
              this.state.passwordStrength.uppercase
                ? null
                : <PasswordCheck
                  check={'1 uppercase letter'}
                />
            }
            {
              this.state.passwordStrength.lowercase
                ? null
                : <PasswordCheck
                  check={'1 lowercase letter'}
                />
            }
            {
              this.state.passwordStrength.digit
                ? null
                : <PasswordCheck
                  check={'1 number'}
                />
            }
            {
              this.state.passwordStrength.special
                ? null
                : <PasswordCheck
                  check={'1 special character'}
                />
            }
            {
              this.state.passwordStrength.length
                ? null
                : <PasswordCheck
                  check={'At least 8 characters'}
                />
            }
          </View>
        }
        nextButton
        buttonActive={this.state.passwordValid}
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
)(OnboardingPassword)
