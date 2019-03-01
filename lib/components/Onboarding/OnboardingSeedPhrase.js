// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Clipboard,
  Text,
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
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
  textColor1,
  secondary,
  width
} from 'circles-mobile/lib/styles'

export class OnboardingVerifyPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mnemonic: ''
    }
    this.textInputsRefs = []
    this.onContinue = this.onContinue.bind(this)
  }

  componentDidMount () {
    // let signUpDetails = {
    //   name: this.props.userData.name,
    //   phone: this.props.userData.phone,
    //   email: this.props.userData.email,
    //   picture: this.props.userData.picture && this.props.userData.picture.uri,
    //   password: this.state.password
    // }
    let wallet = ethers.Wallet.createRandom()
    this.saveWallet(wallet)
    // this.props.initSignUp(signUpDetails)
  }
  async saveWallet (wallet) {
    await SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
    this.setState({ mnemonic: wallet.mnemonic })
  }

  onContinue () {
    Clipboard.setString(this.state.mnemonic)
    this.props.navigation.push('Terms')
  }
  render () {
    let mnemonic = this.state.mnemonic ? this.state.mnemonic.split(' ').map((val, i) => {
      return <View style={{ borderWidth: 2, borderColor: 'white', padding: 5, margin: 5 }} key={i}><Text style={{ color: 'white', fontFamily: fonts.primaryText, fontWeight: '500', fontSize: 14 }}>{val.toUpperCase()}</Text></View>
    }) : null
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 30, alignSelf: 'center' }}>
                  {mnemonic}
                </View>

              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <NextButton active onPress={this.onContinue} />
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
