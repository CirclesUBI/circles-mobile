// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TextInput,
  Text
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import { ethers } from 'ethers'


import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'

// Actions
import { setVerificationState } from '../../actions/OnboardingActions'

import { ConsoleLogger } from '@aws-amplify/core'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

const logger = new ConsoleLogger('ForgotPasswordSeedPhrase')

export class ForgotPasswordSeedPhrase extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      phrase: ''
    }
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async onContinue () {
    if (this.state.phrase) {
      let mnemonic = this.state.phrase.toLowerCase().trim().split(' ')
      if (mnemonic.length > 12)
        logger.warn('not enough words')
      try {    
        mnemonic = mnemonic.join(' ')
        logger.info('mnemonic', mnemonic)
        const wallet = ethers.Wallet.fromMnemonic(mnemonic)
        logger.info('w from mnem', wallet)
        SecureStore.setItemAsync('wallet', JSON.stringify(wallet))         
      } catch(error) {
        logger.error(error.message)
      } 
    }
  }

  handleChange (value) {
    value = value.toUpperCase()    
    this.setState({ phrase: value })
  }

  render () {
    const showButton = this.props.verificationState === 'verified'
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: fonts.titleText,
                  marginTop: '40%'
                }}
              >
                ENTER SEED PHRASE
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
              Enter your 12 word seed phrase to unlock your wallet.
              </Text>
            </View>
            <TextInput
              style={{                
                marginTop: 15,
                padding: 5,
                flex: 1,                                
                marginLeft: 30,
                marginRight: 30,
                borderColor: 'white', 
                borderWidth: 2,
                color: 'white',
                verticalAlign: 'text-top'
              }}
              textContentType='oneTimeCode'
              scrollEnabled={false}
              autoComplete='off'
              autoCorrect={false}
              importantForAutofill='no'
              autocapitalize='characters' // bug on android: https://github.com/facebook/react-native/issues/13897
              onChangeText={this.handleChange}
              label={'Seed Phrase'}              
              editable = {true}              
              multiline = {true}
              numberOfLines = {4}
              textAlignVertical= "top"
              value={this.state.phrase}
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={true}
            />
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
          <View style={{ flex: 0.5 }}>
            <NextButton active onPress={this.onContinue} />
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
    },
    addRecoveryData: data => {
      dispatch(addRecoveryData(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordSeedPhrase)

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
