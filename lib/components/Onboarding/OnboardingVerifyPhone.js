// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text,
  TextInput
} from 'react-native'
// import { internationalFormat } from '../../utilities/phoneNumber'
import { LinearGradient } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
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
      verificationCode: null
    }
    this.textInputsRefs = []
    this.onProcess = this.onProcess.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    let signUpDetails = {
      name: this.props.userData.name,
      username: this.props.userData.username,
      phone: this.props.userData.phone,
      email: this.props.userData.email,
      picture: this.props.userData.picture && this.props.userData.picture.uri,
      password: this.props.userData.password // hash this
    }
    this.props.initSignUp(signUpDetails)
  }

  onProcess () {
    Keyboard.dismiss()
    if (this.props.verificationState === 'unverified' || this.props.verificationState === 'unconfirmed') {
      let confirmsignUpDetails = {
        username: this.props.userData.username,
        phone: this.props.userData.phone,
        password: this.props.userData.password,
        code: this.state.verificationCode
      }
      this.props.confirmSignUp(confirmsignUpDetails)
    }
  }

  onContinue () {
    console.log('onContinue')
    this.props.navigation.push('SeedPhrase')
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
    // const formattedPhone = internationalFormat(
    //   this.props.userData.phone,
    //   this.props.userData.country
    // )    

    const showButton = this.props.verificationState === 'verified'    
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='80%' />
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
                  ENTER SMS CODE
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: textColor1,
                    marginTop: 15
                  }}
                >
                We have sent a SMS code to
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: textColor1,
                    marginTop: 15
                  }}
                >
                  {`${this.props.userData.phone}`}
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
                keyboardType={'number-pad'}
                label='Verification code'
                placeholder='Enter 6-digit code'
                placeholderTextColor={textColor4}
                maxLength={6}
                autofocus
                returnKeyType='done'
                onSubmitEditing={() =>
                  this.state.verificationCode &&
                  this.state.verificationCode.length === 6
                    ? this.onProcess() : null
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
