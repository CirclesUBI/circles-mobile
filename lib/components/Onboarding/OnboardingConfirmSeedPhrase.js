// Frameworks
import React from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'

// Styles
import {
  fonts,
  textColor1,
  primary,
  secondary,
  width
} from 'circles-mobile/lib/styles'

export class OnboardingConfirmSeedPhrase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mnemonic: [],
      touchIndex: 12,
      touched: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true
      }
    }
    this.textInputsRefs = []
    this.onContinue = this.onContinue.bind(this)
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

  onContinue () {
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
                  CONFIRM YOUR 12 WORD SEED PHRASE
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
                Select the seed words in the order that you received them.
                This is the only way to recover your account - save this somewhere where only you can find it.
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 20, alignSelf: 'center' }}>
                  {mnemonic}
                </View>

              </View>
            </View>
            <View style={{ flex: 0.24 }}>
              <NextButton active={this.state.touchIndex === 12} onPress={this.onContinue} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default OnboardingConfirmSeedPhrase
