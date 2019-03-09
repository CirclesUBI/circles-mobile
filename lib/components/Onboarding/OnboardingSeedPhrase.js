// Frameworks
import React from 'react'
import {
  View,
  Clipboard,
  Text
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import { ethers } from 'ethers'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'

// Styles
import {
  fonts,
  textColor1,
  secondary,
  width
} from 'circles-mobile/lib/styles'

export class OnboardingSeedPhrase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mnemonic: ''
    }
    this.onContinue = this.onContinue.bind(this)
  }

  componentDidMount () {
    this.getWallet()
  }

  async getWallet () {
    let wallet = JSON.parse(await SecureStore.getItemAsync('wallet'))
    let mnemonic = wallet.signingKey.mnemonic
    this.setState({ mnemonic: mnemonic })
  }

  onContinue () {
    Clipboard.setString(this.state.mnemonic)
    this.props.navigation.push('ConfirmSeedPhrase')
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 20, alignSelf: 'center' }}>
                  {mnemonic}
                </View>

              </View>
            </View>
            <View style={{ flex: 0.24 }}>
              <NextButton active onPress={this.onContinue} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default OnboardingSeedPhrase
