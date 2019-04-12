// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import { SecureStore } from 'expo'

// Styles
import {
  fonts,
  textColor1,
  primary
} from 'circles-mobile/lib/styles'

export class OnboardingConfirmSeedPhrase extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      mnemonic: [],
      touchIndex: 0,
      touched: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false
      }
    }
    this.textInputsRefs = []
    this.onProcess = this.onProcess.bind(this)
    this.getWallet = this.getWallet.bind(this)
  }

  componentDidMount () {
    this.getWallet()
  }

  async getWallet () {
    let wallet = JSON.parse(await SecureStore.getItemAsync('wallet'))
    let mnemonic = wallet.signingKey.mnemonic.split(' ')
    this.setState({ mnemonic: mnemonic, randomizedMnemonic: mnemonic.slice().sort(() => Math.random() - 0.5) })
  }

  onProcess () {
    this.props.navigation.push('Consent')
  }

  handleWordTouch (val, i) {
    if (val === this.state.mnemonic[this.state.touchIndex]) {
      this.setState({
        touchIndex: this.state.touchIndex + 1,
        touched: Object.assign({}, this.state.touched, { [this.state.touchIndex]: true }),
        randomizedMnemonic: this.state.randomizedMnemonic.slice(0, this.state.touchIndex).concat(
          [this.state.randomizedMnemonic[i]].concat(
            this.state.randomizedMnemonic.slice(this.state.touchIndex, i), this.state.randomizedMnemonic.slice(i + 1)))
      })
    }
  }
  render () {
    let mnemonic
    if (this.state.randomizedMnemonic) {
      mnemonic = this.state.randomizedMnemonic.map((val, i) => {
        return <TouchableHighlight key={i} onPress={() => this.handleWordTouch(val, i)}>
          <View style={[{ borderWidth: 2, borderColor: 'white', padding: 5, margin: 5 }, this.state.touched[i] ? { backgroundColor: primary } : {}]}>
            <Text style={{ color: 'white', fontFamily: fonts.primaryText, fontWeight: '500', fontSize: 14 }}>
              {val.toUpperCase()}
            </Text>
          </View>
        </TouchableHighlight>
      })
    }
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
              {translate('CONFIRM YOUR 12 WORD SEED PHRASE')}
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
              {translate('Select the seed words in the order that you received them. This is the only way to recover your account - save this somewhere where only you can find it.')}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 20, alignSelf: 'center' }}>
              {mnemonic}
            </View>
          </View>
        }
        nextButton
        buttonActive={this.state.touchIndex === 12}
        buttonPress={this.onProcess}
        footer={<View style={{ height: 40 }} />}
      />
    )
  }
}

OnboardingConfirmSeedPhrase.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingConfirmSeedPhrase
