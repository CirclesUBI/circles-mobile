// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Clipboard,
  Text
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import { SecureStore } from 'expo'

// Styles
import {
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

export class OnboardingSeedPhrase extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      mnemonic: ''
    }
    this.onProcess = this.onProcess.bind(this)
    this.getWallet = this.getWallet.bind(this)
  }

  componentDidMount () {
    this.getWallet()
  }

  async getWallet () {
    let wallet = JSON.parse(await SecureStore.getItemAsync('wallet'))
    let mnemonic = wallet.signingKey.mnemonic
    this.setState({ mnemonic: mnemonic })
  }

  onProcess () {
    Clipboard.setString(this.state.mnemonic)
    this.props.navigation.push('ConfirmSeedPhrase')
  }
  render () {
    let mnemonic = this.state.mnemonic ? this.state.mnemonic.split(' ').map((val, i) => {
      return <View style={{ borderWidth: 2, borderColor: 'white', padding: 5, margin: 5 }} key={i}><Text style={{ color: 'white', fontFamily: fonts.primaryText, fontWeight: '500', fontSize: 14 }}>{val.toUpperCase()}</Text></View>
    }) : null
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'90%'}
        main={
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 24,
                fontFamily: fonts.titleText,
                marginTop: '50%'
              }}
            >
              {translate('SAVE YOUR 12 WORD SEED PHRASE')}
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
              {translate('This is the only way to recover your account -- save this somewhere where only you can find it.')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 20, alignSelf: 'center' }}>
              {mnemonic}
            </View>

          </View>
        }
        nextButton
        buttonActive
        buttonPress={this.onProcess}
        footer={<View style={{ height: 40 }} />}
      />
    )
  }
}

OnboardingSeedPhrase.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingSeedPhrase
