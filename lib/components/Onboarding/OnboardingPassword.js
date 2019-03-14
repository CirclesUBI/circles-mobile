import React from 'react'
import {
  View,
  TextInput,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import {
  secondary,
  width,
  fonts
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import { Toast } from 'antd-mobile-rn'
// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

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
    this.onProcessPassword = this.onProcessPassword.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onContinue () {
    this.props.navigation.push('ConfirmPassword')
  }

  onProcessPassword () {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if ((this.state.password && this.state.password.length < 8) || !regex.test(this.state.password)) {
      this.setState({ passwordValid: false, password: this.state.password })
      Toast.fail('Please enter a valid password', 3)
    } else {
      this.setState({ passwordValid: true, password: this.state.password })
      this.props.addOnboardingData({ password: this.state.password })
    }
  }

  handleChange (value) {
    value = value.trim()
    let hasEnoughChars = (value.length >= 8)
    let hasUpperCase = /[A-Z]/.test(value)
    let hasLowerCase = /[a-z]/.test(value)
    let hasNumber = /\d+/.test(value)
    let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value) // Is this a comprehensive list of special chars?

    this.setState({ passwordStrength: {
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      digit: hasNumber,
      length: hasEnoughChars,
      special: hasSpecialChar
    } })

    this.setState({ password: value })
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='50%' />
            }
            closeFunction={() => this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({
                routeName: 'Main',
                action: NavigationActions.navigate({
                  routeName: 'Intro',
                  action: NavigationActions.navigate({
                    routeName: 'Splash'
                  })
                })
              })]
            }))}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
              <TextInput
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
                onChangeText={value => this.handleChange(value)} /* needs test */
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
                  : <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: fonts.primaryText,
                    alignSelf: 'center',
                    marginTop: 18
                  }}>
                    1 uppercase letter
                  </Text>
              }
              {
                this.state.passwordStrength.lowercase
                  ? null
                  : <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: fonts.primaryText,
                    alignSelf: 'center',
                    marginTop: 5
                  }}>
                    1 lowercase letter
                  </Text>
              }
              {
                this.state.passwordStrength.digit
                  ? null
                  : <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: fonts.primaryText,
                    alignSelf: 'center',
                    marginTop: 5
                  }}>
                    1 number
                  </Text>
              }
              {
                this.state.passwordStrength.special
                  ? null
                  : <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: fonts.primaryText,
                    alignSelf: 'center',
                    marginTop: 5
                  }}>
                    1 special character
                  </Text>
              }
              {
                this.state.passwordStrength.length
                  ? null
                  : <Text style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: fonts.primaryText,
                    alignSelf: 'center',
                    marginTop: 5
                  }}>
                    8 or more characters
                  </Text>
              }
            </View>
            <View style={{ flex: 0.6 }}>
              <NextButton active={this.state.passwordValid} onPress={this.onContinue} />
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
          </View>
        </LinearGradient>
      </View>
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
