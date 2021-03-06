// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
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

class ForgotPasswordSeedPhrase extends React.Component {
  constructor (props, {t: translate}) {
    super(props)    
    this.state = {
      phraseValid: false,
      phrase: ''
    }
    this.translate = translate
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async onContinue () {
    try {
      const wallet = await ethers.Wallet.fromMnemonic(this.state.phrase)      
      if (wallet) {
        SecureStore.setItemAsync('wallet', JSON.stringify(wallet))
        this.props.navigation.push('RecoveryPhoneNumConfirm')
      }
      // todo: else notif user            
    } catch(error) {
      logger.error(error)
    } 
  }

  handleChange (value) {
    this.setState({ phrase: value })
    this.setState({ phraseValid: (value.split(' ').length === 12) })
  }

  render () {
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
                {this.translate('ENTER SEED PHRASE')}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                {this.translate('Enter your 12 word seed phrase to unlock your wallet.')}
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
                color: 'white' 
              }}
              scrollEnabled={false}
              autoComplete='off'
              autoCorrect={false}
              importantForAutofill='no'
              autocapitalize='characters' // bug on android: https://github.com/facebook/react-native/issues/13897
              onChangeText={this.handleChange}
              label={this.translate('Seed Phrase')}
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
              {this.translate('This field is required')}
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active={this.state.phraseValid} onPress={this.onContinue} />
          </View>
        </LinearGradient>
      </View>        
    )
  }
}

ForgotPasswordSeedPhrase.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    recoveryData: state.recovery.recoveryData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordSeedPhrase)
