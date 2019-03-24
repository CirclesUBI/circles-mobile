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
import {
  addRecoveryData
} from 'circles-mobile/lib/actions/RecoveryActions'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

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

export class ForgotPasswordUpdate extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      newPassword: '',
      passwordValid: false,
      passwordStrength: {
        uppercase: false,
        lowecase: false,
        digit: false,
        length: false,
        special: false
      }
    }
    this.onProcess = this.onProcess.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  onProcess () {
    this.props.addRecoveryData({ password: this.state.password })
    this.props.navigation.push('ForgotConfirm')
  }

  handlePasswordChange (value) {
    value = value.trim()
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const hasEnoughChars = (value.length >= 8)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumber = /\d+/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value) // Is this a comprehensive list of special chars?
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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <OnboardingTextInput
              changeHandler={this.handlePasswordChange}
              label={'Password'}
              placeholder={'Password'}
              textContentType='password'
              secureTextEntry
              onChangeText={value => this.handlePasswordChange(value)} /* needs test */
              style={{ marginTop: '35%' }}
            />
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
          <View style={{ flex: 0.5 }}>
            <NextButton active={this.state.passwordValid} onPress={this.onProcess} />
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
    addRecoveryData: data => {
      dispatch(addRecoveryData(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordUpdate)
