import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo'
import OnboardingLogo from 'circles-mobile/lib/components/Onboarding/splash/OnboardingLogo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'

import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

import {
  secondary,
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

import { NavigationActions, StackActions } from 'react-navigation'
// import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'

import { Auth } from 'aws-amplify'

// Actions
import {
  addRecoveryData
} from 'circles-mobile/lib/actions/RecoveryActions'

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
  },
  inputStyle: {
    height: calculateHeightRatio(40),
    width: calculateWidthRatio(285),
    color: '#CECECE',
    fontSize: 16,
    fontFamily: fonts.primaryText,
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: 'center',
    borderColor: 'rgba(58,59,78,49)'
  }
})

class ForgotPasswordScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: '+',
      username: ''     
    }
    this.handleRecoverButton = this.handleRecoverButton.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
  }

  componentDidMount () {
    logger.info('Mounted')
    // if (this.props.authState === 'authorized') this.resetToHomeScreen()
  }

  handleUsernameChange (username) {
    this.setState({ username: username })
  }

  async handleRecoverButton () {
    this.props.navigation.push('ForgotVerify')
    if (this.state.username) {    
      try {
        // let result = await Auth.forgotPassword(this.state.username)
        // console.log(result)
        // this.props.addRecoveryData({ username: this.state.username, destination: result.Destination })
        this.props.navigation.push('ForgotVerify')
      } catch(error) {
        console.log(error)
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
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <OnboardingLogo />
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: width,
                height: height - 100,
                alignItems: 'center'
              }}
            >
              <LoginTextLabel label={'USERNAME / MOBILE NUMBER'} />
              <LoginTextInput
                placeholder={'Enter your mobile number'}
                label='Mobile Number'
                value={this.state.username}
                onChangeText={value => this.handleUsernameChange(value)}
              />              
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active onPress={this.handleRecoverButton} />
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const LoginTextInput = (props) => {
  return (
    <TextInput
      onChangeText={props.onChangeText} /* needs test */
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      placeholderTextColor={'#FFFFFF'}
      autofocus
      underlineColorAndroid={'#FFFFFF'}
      returnKeyType='next'
      style={styles.inputStyle}
      {...props}
    />
  )
}

const LoginTextLabel = ({ label }) => {
  return (
    <Text
      style={[
        {
          fontSize: 24,
          width: calculateWidthRatio(115),
          marginTop: 20
        },
        styles.general
      ]}
    >
      {label}
    </Text>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addRecoveryData: data => {
      dispatch(addRecoveryData(data))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordScreen)
