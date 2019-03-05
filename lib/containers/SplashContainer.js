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
import { LinearGradient } from 'expo'
import OnboardingLogo from '../components/Onboarding/splash/OnboardingLogo'
import OnboardingIntro from '../components/Onboarding/splash/OnboardingIntro'
import OnboardingLogin from '../components/Onboarding/splash/OnboardingLogin'
import OnboardingButtons from '../components/Onboarding/splash/OnboardingButtons'
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { addCognitoUserData, initSignIn, confirmSignIn } from 'circles-mobile/lib/actions/AuthActions'
import { selectWallet } from 'circles-mobile/lib/actions/AppActions'

import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

import {
  primary,
  secondary,
  tertiary,
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

import { NavigationActions, StackActions } from 'react-navigation'
// import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'

const logger = new ConsoleLogger('SplashScreen')

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

class SplashContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: '+49',
      phone: '',
      password: '',
      username: ''
    }
    this.handleLoginButton = this.handleLoginButton.bind(this)
  }

  componentDidMount () {
    logger.info('Mounted')
    // if (this.props.authState === 'authorized') this.resetToHomeScreen()
  }

  handleUsernameChange (username) {
    this.setState({ username: username })
  }

  handlePasswordChange (password) {
    this.setState({ password: password })
  }

  handleCodeChange (code) {
    this.setState({ code: code })
  }

  handleLoginButton () {
    if (this.state.username && this.state.password) {
      if (this.state.code) {
        this.props.confirmSignIn(this.state.code)
          .then(this.props.navigation.navigate('HomeScreen'))
          .catch(err => logger.error(err))
      } else {
        let signInDetails = {
          username: this.state.username,
          password: this.state.password
        }
        this.props.initSignIn(signInDetails)
      }
    }
  }

  resetToHomeScreen () {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.navigate({ routeName: 'Tabs' })
      })]
    }))
  }

  render () {
    let diallingCode = this.state.intlDiallingCode
    let formattedPhone = ''

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <OnboardingLogo />
          <View style={{ flex: 1.45 }}>
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
                      width: calculateWidthRatio(200),
                      marginTop: 10
                    },
                    styles.general
                  ]}
                >
                  USERNAME / PHONE
                </Text>
                <TextInput
                  onChangeText={value => this.handleUsernameChange(value)} /* needs test */
                  value={this.state.username}
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
          </View>
          <OnboardingButtons
            navigation={this.props.navigation}
            handleLoginButton={this.handleLoginButton}
            addCognitoUserData={this.props.addCognitoUserData}
            selectWallet={this.props.selectWallet}
          />
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    wallets: state.wallets,
    authState: state.app.authState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentCountry: () => {
      dispatch(fetchCurrentCountry())
    },
    initSignIn: data => {
      dispatch(initSignIn(data))
    },
    confirmSignIn: data => {
      dispatch(confirmSignIn(data))
    },
    addCognitoUserData: data => {
      dispatch(addCognitoUserData(data))
    },
    selectWallet: data => dispatch(selectWallet(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashContainer)
