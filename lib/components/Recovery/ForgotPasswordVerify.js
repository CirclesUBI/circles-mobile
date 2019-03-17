// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'
// import { internationalFormat } from '../../utilities/phoneNumber'
// Actions
import { setVerificationState } from '../../actions/OnboardingActions'

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

export class ForgotPasswordVerify extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      verificationCode: null,
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
    this.textInputsRefs = []
    this.onProcess = this.onProcess.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleCodeChange = this.handleCodeChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  componentDidMount () {
    // let signUpDetails = {
    //   name: this.props.userData.name,
    //   username: this.props.userData.username,
    //   phone: this.props.userData.phone,
    //   email: this.props.userData.email,
    //   picture: this.props.userData.picture && this.props.userData.picture.uri,
    //   password: this.props.userData.password // hash this
    // }
    // this.props.initSignUp(signUpDetails)
  }

  onProcess () {
    Keyboard.dismiss()
    if (this.props.verificationState === 'unverified' || this.props.verificationState === 'unconfirmed') {
      let forgotPasswordDetails = {
        username: this.props.recoveryData.username,
        newPassword: this.state.newPassword,
        code: this.state.verificationCode
      }
      this.props.confirmSignUp(forgotPasswordDetails)
    }
  }

  onContinue () {
    this.props.navigation.push('SeedPhrase')
  }

  handleCodeChange (verificationCode) {
    if (this.props.verificationState === 'verified') return
    verificationCode = verificationCode.trim()
    this.setState({ verificationCode })
    if (verificationCode.length < 6) setVerificationState('incomplete')
    else if (verificationCode.length === 0) {
      setVerificationState('unverified')
    }
  }

  handlePasswordChange (value) {
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
    // const formattedPhone = internationalFormat(
    //   this.props.userData.phone,
    //   this.props.userData.country
    // )

    const showButton = this.props.verificationState === 'verified'
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: fonts.titleText,
                  marginTop: '10%'
                }}
              >
                ENTER SMS CODE
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 10
                }}
              >
              We have sent a SMS code to
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 10
                }}
              >
                {`${this.props.recoveryData.destination}`}
              </Text>
            </View>
            <OnboardingTextInput
              style={{
                // marginTop: '10%',
                height: '10%',
                width: '85%',
                color: '#CECECE',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                borderBottomWidth: 1,
                marginTop: 20,
                alignSelf: 'center',
                textAlign: 'center',
                borderColor: 'rgba(58,59,78,49)'
              }}
              changeHandler={this.handleCodeChange}
              label={'Verification Code'}
              placeholder={'Enter 6-digit Code'}
              maxLength={6}
              value={this.state.verificationCode}
              keyboardType={'number-pad'}
              onSubmitEditing={() =>
                this.state.verificationCode &&
                this.state.verificationCode.length === 6
                  ? this.onProcess() : null
              }
            />
            <OnboardingTextInput
              changeHandler={this.handlePasswordChange}
              label={'Password'}
              placeholder={'Password'}
              textContentType='password'
              secureTextEntry
              onChangeText={value => this.handlePasswordChange(value)} /* needs test */
              style={{ marginTop: '10%' }}
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
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordVerify)

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
