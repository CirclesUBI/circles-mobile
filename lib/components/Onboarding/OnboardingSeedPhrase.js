// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { internationalFormat } from '../../utilities/phoneNumber'
import { LinearGradient, SecureStore } from 'expo'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { NavigationActions, StackActions } from 'react-navigation'
import { ethers } from 'ethers'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
// Actions
import { initSignUp, confirmSignUp } from '../../actions/AuthActions'
import { setVerificationState } from '../../actions/OnboardingActions'

// Styles
import {
  fonts,
  textColor4,
  textColor1,
  secondary,
  width
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
//
// const styles = StyleSheet.create({
//   pinBox: {
//     flex: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 5,
//     marginLeft: 60,
//     marginRight: 60,
//     borderBottomWidth: 1
//   },
//   pinInput: {
//     flex: 1,
//     fontFamily: fonts.primaryText,
//     fontSize: 24,
//     lineHeight: 33,
//     textAlign: 'center',
//     height: 50
//   },
//   loginText: {
//     fontFamily: fonts.secondaryText,
//     color: 'white',
//     fontSize: 14
//   },
//   loginButton: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: textColor4
//   },
//   backgroundRed: {
//     backgroundColor: '#FF0000'
//   },
//   backgroundGreen: {
//     backgroundColor: primary
//   }
// })

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
      picture: this.props.userData.picture && this.props.userData.picture.uri,
      password: this.state.password
    }
    let wallet = ethers.Wallet.createRandom()
    this.saveWallet(wallet)
    this.props.initSignUp(signUpDetails)
  }
  async saveWallet (wallet) {
    await SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
    this.setState({mnemonic: wallet.mnemonic})
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
    if (verificationCode.length < 6) setVerificationState('incomplete')
    else if (verificationCode.length === 0) {
      setVerificationState('unverified')
    }
  }

  render () {
    const formattedPhone = internationalFormat(
      this.props.userData.phone,
      this.props.userData.country
    )

    const showButton = (this.state && this.state.verificationCode) || this.props.verificationState === 'verified'
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='90%' />
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
            <View style={{ flex: 1 }}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontFamily: fonts.titleText,
                    marginTop: '50%'
                  }}
                >
                  SAVE YOUR 12 WORD SEED PHRASE
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: textColor1,
                    marginTop: 15,
                    width: '60%',
                    alignSelf: 'center'
                  }}
                >
                This is the only way to recover your account -- save this somewhere where only you can find it.
                </Text>
                {/* <Text
                  style={{
                    textAlign: 'center',
                    color: textColor1,
                    marginTop: 15
                  }}
                >
                  Please enter the 6 digit activation code sent to your mobile
                </Text> */}
              </View>
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
            <View style={{ flex: 0.3 }}>
              <NextButton active={showButton} onPress={this.onContinue} />
              {/* <TouchableOpacity
                disabled={this.props.offline || this.props.calling}
                onPress={this.handlePhoneCall}
                style={{ alignSelf: 'center', marginTop: 15 }}
              >
                <Text infoButtonLabel style={{ color: textColor2 }}>
                  Call Me
                </Text>
              </TouchableOpacity>
              */}
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  marginTop: 15
                }}
              >
                Didn't receive a code?
              </Text>
            </View>
          </View>
        </LinearGradient>
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
    },
    setVerificationState: (verificationState) => {
      dispatch(setVerificationState(verificationState))
    }
    // verifyPhoneCode: (address, code) => {
    //   dispatch(verifyPhoneCode(address, code))
    // }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingVerifyPhone)
