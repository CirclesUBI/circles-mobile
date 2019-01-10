import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import { addData, fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { signIn } from 'circles-mobile/lib/actions/AuthActions'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  primary,
  secondary,
  tertiary,
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

import AuthManager from 'circles-mobile/lib/components/AuthManager'
import { NavigationActions, StackActions } from 'react-navigation'
import * as _ from 'lodash'
import { customHttpProvider, PersonFactoryContract } from 'circles-mobile/lib/utilities/blockchain'
import { ethers } from 'ethers'

const styles = StyleSheet.create({
  general: {
    fontFamily: fonts.titleText,
    color: 'white',
    textAlign: 'center'
  },
  general2: {
    fontFamily: fonts.primaryText,
    color: 'white',
    textAlign: 'center'
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    width: width / 2,
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class SplashScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      everSignedIn: true,
      intlDiallingCode: '+49',
      phone: '4917643698891',
      password: 'testpass123'
    }
    this.clickHandler = this.clickHandler.bind(this)
  }

  async clickHandler (props) {
    // let mnemonic = 'blood evil wonder fame frequent mix hurt copper virus segment armed suit'
    // let wallet = ethers.Wallet.fromMnemonic(mnemonic)
    // let connectedWallet = wallet.connect(customHttpProvider)
    let randomWallet = ethers.Wallet.createRandom()
    let err = await SecureStore.setItemAsync('wallet', JSON.stringify(randomWallet))
    console.log(err, 'honey im err')
    // let PersonFactoryContractSigner = PersonFactoryContract.connect(connectedWallet)
    // let tx = await PersonFactoryContractSigner.build({ gasLimit: 2000000 })
    // await tx.wait()
    console.log('yay')
    let item = await SecureStore.getItemAsync('wallet')
    console.log(item, 'dat sweet item goodness')
    // props.navigation.navigate('Complete')
  }

  componentDidMount () {
    if (this.props.isSignedIn) this.resetToHomeScreen()
  }

  handlePhoneChange (phone) {
    this.setState({ phone: phone.replace(/[^\d]/g, '') })
  }

  handlePasswordChange (password) {
    this.setState({ password: password })
  }

  handleCodeChange (code) {
    this.setState({ code: code })
  }

  handleLoginButton () {
    if (this.state.phone && this.state.password) {
      if (this.state.code) {
        AuthManager.confirmSignIn(this.state.code)
          .then(this.props.navigation.navigate('HomeScreen'))
          .catch(err => console.log(err))
      } else {
        let username = '+' + this.state.phone
        let signInDetails = {
          username,
          password: this.state.password
        }
        this.props.signIn(signInDetails)
      }
    }
  }

  resetToHomeScreen () {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.navigate({routeName: 'Tabs'})
      })]
    }))
  }

  render () {
    let diallingCode = this.state.intlDiallingCode
    let formattedPhone = ''

    if (this.state.phone) {
      formattedPhone = this.state.phone.substring(diallingCode.length - 1)
      if (formattedPhone.length !== 0) {
        formattedPhone = (+formattedPhone)
      }
    }

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: calculateHeightRatio(66)
            }}
          >
            <Image
              style={{
                width: calculateWidthRatio(190),
                height: calculateHeightRatio(192),
                resizeMode: 'contain'
              }}
              source={require('circles-mobile/images/logo.png')}
            />
          </View>
          <View style={{ flex: 1.45 }}>
            <ScrollView horizontal>
              <View
                style={{
                  width: width,
                  height: height - 200,
                  alignItems: 'center',
                  marginTop: 20
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 24,
                      width: calculateWidthRatio(115),
                      marginTop: 10
                    },
                    styles.general
                  ]}
                >
                  Welcome to
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 60
                    },
                    styles.general
                  ]}
                >
                  Circles
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 12,
                      width: calculateWidthRatio(224),
                      marginTop: 20
                    },
                    styles.general2
                  ]}
                >
                  Circles is a universal basic income based on a network of
                  trust.
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 12,
                      width: calculateWidthRatio(224),
                      marginTop: 20
                    },
                    styles.general2
                  ]}
                >
                  Invite friends you know and trust into the Circles system in
                  order to exchange money with them!
                </Text>
                {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
              </View>
              <View
                style={{
                  width: width,
                  height: height - 100,
                  alignItems: 'center',
                  marginTop: 20
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 24,
                      width: calculateWidthRatio(115),
                      marginTop: 10
                    },
                    styles.general
                  ]}
                >
                  PHONE
                </Text>
                <TextInput
                  onChangeText={value => this.handlePhoneChange(value)} /* needs test */
                  value={'(' + diallingCode + ') ' + formattedPhone}
                  keyboardType={'phone-pad'}
                  label='Mobile Number'
                  placeholder='Enter your mobile number'
                  placeholderTextColor={'#FFFFFF'}
                  autofocus
                  underlineColorAndroid={'#FFFFFF'}
                  returnKeyType='next'
                  onSubmitEditing={() => {
                    // validNumber && this.onProcess()
                    // this.onProcess()
                  }
                  } /* needs test */
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 16,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    marginTop: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                    borderColor: 'rgba(58,59,78,49)'
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: 24,
                      width: calculateWidthRatio(115),
                      marginTop: 10
                    },
                    styles.general
                  ]}
                >
                  PASSWORD
                </Text>
                <TextInput
                  onChangeText={value => this.handlePasswordChange(value)} /* needs test */
                  value={this.state.password}
                  label='Password'
                  secureTextEntry
                  placeholder='Enter your password'
                  placeholderTextColor={'#FFFFFF'}
                  autofocus
                  underlineColorAndroid={'#FFFFFF'}
                  returnKeyType='next'
                  onSubmitEditing={() => {
                    // validNumber && this.onProcess()
                    // this.onProcess()
                  }
                  } /* needs test */
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 16,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    marginTop: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                    borderColor: 'rgba(58,59,78,49)'
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: 24,
                      width: calculateWidthRatio(115)
                    },
                    styles.general
                  ]}
                >
                  CODE
                </Text>
                <TextInput
                  onChangeText={value => this.handleCodeChange(value)} /* needs test */
                  value={this.state.code}
                  label='Code'
                  placeholder='Enter your verification code.'
                  placeholderTextColor={'#FFFFFF'}
                  autofocus
                  underlineColorAndroid={'#FFFFFF'}
                  returnKeyType='next'
                  onSubmitEditing={() => {
                    // validNumber && this.onProcess()
                    // this.onProcess()
                  }
                  } /* needs test */
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 16,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    marginTop: 10,
                    alignSelf: 'center',
                    textAlign: 'center',
                    borderColor: 'rgba(58,59,78,49)'
                  }}
                />
              </View>
            </ScrollView>
          </View>
          {(!this.state.everSignedIn) ? (
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <TouchableHighlight
                style={[
                  styles.loginButton,
                  { backgroundColor: secondary, width: width }
                ]}
                onPress={() => {
                  this.clickHandler()
                }}
              >
                <Text style={styles.loginText}>
                  SIGN UP
                </Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <TouchableHighlight
                style={[styles.loginButton, { width: width / 3, backgroundColor: primary }]}
                onPress={() => {
                  this.handleLoginButton()
                }}
              >
                <Text style={styles.loginText}>
                  LOGIN
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.loginButton, { width: width / 3, backgroundColor: secondary }]}
                onPress={() => {
                  this.props.navigation.push('Terms')
                }}
              >
                <Text style={styles.loginText}>
                  SIGN UP
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.loginButton, { width: width / 3, backgroundColor: tertiary }]}
                onPress={() => {
                  // this.props.addData({name: 'guest'})
                  // this.props.navigation.navigate('HomeScreen')
                  this.clickHandler()
                }}
              >
                <Text style={styles.loginText}>
                  GUEST
                </Text>
              </TouchableHighlight>
            </View>
          )}
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    isSignedIn: state.user.isSignedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentCountry: () => {
      dispatch(fetchCurrentCountry())
    },
    signIn: data => {
      dispatch(signIn(data))
    },
    addData: data => {
      dispatch(addData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)
