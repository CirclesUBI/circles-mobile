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
import { initSignUp, confirmSignUp } from 'circles-mobile/lib/actions/AuthActions'

// import {
//   verificationCall,
//   verifyPhoneCode
// } from 'circles-mobile/lib/actions/uportActions'
// import TextInput from '../shared/TextInput'

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
    backgroundColor: textColor4
  },
  backgroundRed: {
    backgroundColor: '#FF0000'
  },
  backgroundGreen: {
    backgroundColor: primary
  }
})
// Constants

export class OnboardingVerifyPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      verificationCode: null,
      password: 'testpass123'
    }
    this.textInputsRefs = []
  }

  componentDidMount () {
    let signUpDetails = {
      name: this.props.userData.name,
      phone: this.props.userData.phone,
      email: this.props.userData.email,
      picture: this.props.userData.picture.uri,
      password: this.state.password
    }
    this.props.initSignUp(signUpDetails)
  }

  onProcess () {
    Keyboard.dismiss()
    if (this.props.verificationState === 'unverified' || this.props.verificationState === 'unconfirmed') {
      let confirmsignUpDetails = {
        phone: this.props.userData.phone,
        password: this.state.password,
        code: this.state.verificationCode
      }
      this.props.confirmSignUp(confirmsignUpDetails)
    }
  }

  handleChange (verificationCode) {
    if (this.props.verificationState === 'verified') return
    verificationCode = verificationCode.trim()
    this.setState({ verificationCode })
  }

  render () {
    const formattedPhone = internationalFormat(
      this.props.userData.phone,
      this.props.userData.country
    )

    const buttonMessage = (this.state.verificationCode && this.state.verificationCode.length === 6) ? this.props.verificationState.toUpperCase() : 'INCOMPLETE'

    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title='Verification Code'
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
              {this.props.verificationState === 'unconfirmed' &&
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: textColor1,
                    marginTop: 15
                  }}
                >
                An account with this phone has been registered but not yet confirmed. Please check your SMS for the verification code.
                </Text>
              }
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
                disabled={this.props.verificationState !== 'verified'}
                style={[styles.loginButton, this.props.verificationState === 'verified' && styles.backgroundGreen, this.props.verificationState === 'incorrect' && styles.backgroundRed]}
                onPress={() => {
                  this.props.navigation.push('Testnet')
                }}
              >
                <View>
                  <Text style={[styles.loginText, { textAlign: 'center' }]}>
                    {buttonMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.onboarding.userData,
    verificationState: state.onboarding.verificationState
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    initSignUp: (signUpDetails) => {
      dispatch(initSignUp(signUpDetails))
    },
    confirmSignUp: (confirmsignUpDetails) => {
      dispatch(confirmSignUp(confirmsignUpDetails))
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
