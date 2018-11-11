// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { internationalFormat } from 'circles-mobile/lib/utilities/phoneNumber'

// Actions
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
// import {
//   verificationCall,
//   verifyPhoneCode
// } from 'circles-mobile/lib/actions/uportActions'
// import TextInput from '../shared/TextInput'

// import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'react-native-aws-cognito-js'

// Styles
import {
  background1,
  fonts,
  primary,
  textColor4,
  textColor1,
  textColor2
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

import NavBar from 'circles-mobile/lib/components/shared/Navbar'

import { Auth } from 'aws-amplify'

const styles = StyleSheet.create({
  pinBox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 60,
    marginRight: 60,
    borderBottomWidth: 1
  },
  pinInput: {
    flex: 1,
    fontFamily: fonts.primaryText,
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    height: 50
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: this.state && this.state.verified ? primary : textColor4
  }
})
// Constants

export class OnboardingVerifyPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      verificationCode: null,
      verified: false,
      buttonMessage: '',
      cognitoUser: null
    }
    // this.onProcess = this.onProcess.bind(this)
    // this.handlePhoneCall = debounce(props.verificationCall, 1000, {leading: true, trailing: false})
    // this.handleCancel = this.handleCancel.bind (this)
    // this.onContinue = this.onContinue.bind(this)
    this.textInputsRefs = []
  }

  componentDidMount () {
    let username = 'edzillion' // '+4917643698891'
    let password = 'b00gb00g'
    let email = 'edzillion@gmail.com'

    this.signUp(username, password, email)
      .then(data => {
        this.addData({name: username, phone: email})
      })
      .catch(err => {
        if (err.code === 'UsernameExistsException') {
          this.signIn(username, password)
            .then(data => console.log(data))
            .catch(err => console.log('signin', err))
        } else if (err.code === 'UserNotConfirmedException') return Auth.resendSignUp(username)
      })
  }

  async signIn (username, password) {
    return Auth.signIn(username, password)
  }

  async signUp (username, password, email) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email: email
      }
    })
  }

  async confirmCode (username, code) {
    return Auth.confirmSignUp(username, code)
  }

  onProcess () {
    Keyboard.dismiss()
    // this.props.verifyPhoneCode(null, this.state.verificationCode)
    this.confirmCode('edzillion', this.state.verificationCode)
      .then(res => console.log('res', res))
      .catch(err => console.log('code', err))
  }

  handleChange (verificationCode) {
    if (verificationCode.length < 6) {
      this.setState({ buttonMessage: 'INCOMPLETE' })
    }
    this.setState({ verificationCode })
  }

  render () {
    const formattedPhone = internationalFormat(
      this.props.userData.phone,
      this.props.userData.country
    )
    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title='Activation Code'
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 0.9 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                Code sent to {`${formattedPhone}`}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                Please enter the 6 digit activation code sent to your mobile
              </Text>
            </View>

            <TouchableOpacity
              disabled={this.props.offline || this.props.calling}
              onPress={this.handlePhoneCall}
              style={{ alignSelf: 'center', marginTop: 15 }}
            >
              <Text infoButtonLabel style={{ color: textColor2 }}>
                Call Me
              </Text>
            </TouchableOpacity>
            <TextInput
              style={[
                // styles.pinInput,
                {
                  height: calculateHeightRatio(40),
                  width: calculateWidthRatio(285),
                  color: '#CECECE',
                  fontSize: 16,
                  fontFamily: fonts.primaryText,
                  borderBottomWidth: 1,
                  marginTop: 40,
                  alignSelf: 'center',
                  textAlign: 'center',
                  borderColor: 'rgba(58,59,78,49)'
                }
              ]}
              onChangeText={value => this.handleChange(value)}
              value={this.state.verificationCode}
              keyboardType='numeric'
              label='Verification code'
              placeholder='Enter 6-digit code'
              placeholderTextColor={textColor4}
              maxLength={6}
              autofocus
              returnKeyType='go'
              onSubmitEditing={() =>
                this.state.verificationCode &&
                this.state.verificationCode.length === 6 &&
                this.onProcess()
              }
            />
          </View>
        </TouchableWithoutFeedback>
        {this.state &&
          this.state.verificationCode && (
            <View style={{ flex: 0.1, backgroundColor: 'white' }}>
              <TouchableOpacity
                disabled={this.state.verified}
                style={[styles.loginButton]}
                onPress={() => {
                  this.props.navigation.push('Testnet')
                }}
              >
                <View>
                  <Text style={[styles.loginText, { textAlign: 'center' }]}>
                    {this.state.buttonMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
      // {/* <ProcessCard
      //   process='verifyPhoneCode'
      //   invalid={!this.state.verificationCode || this.state.verificationCode.length !== 6}
      //   onProcess={this.onProcess.bind(this)}
      //   onContinue={this.onContinue.bind(this)}
      //   keyboardVerticalOffset={55}
      // > */}
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.onboarding.userData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addData: data => {
      dispatch(addData(data))
    }
    // verificationCall: () => {
    //   dispatch(verificationCall())
    // },
    // verifyPhoneCode: (address, code) => {
    //   dispatch(verifyPhoneCode(address, code))
    // }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingVerifyPhone)
