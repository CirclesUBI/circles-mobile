import React from 'react'
import PropTypes from 'prop-types'
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

import { ConsoleLogger } from '@aws-amplify/core'

// Actions
import { initForgotPassword } from 'circles-mobile/lib/actions/AuthActions'

const logger = new ConsoleLogger('ForgotPasswordScreen')

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
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      intlDiallingCode: '+',
      username: props.recoveryData.username || ''
    }
    this.translate = translate
    this.handleRecoverButton = this.handleRecoverButton.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
  }

  handleUsernameChange (username) {
    this.setState({ username: username })
  }

  handleRecoverButton () {
    if (this.state.username) {    
      try {
        this.props.initForgotPassword({username: this.state.username})        
      } catch(error) {
        logger.error(error)        
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
              <LoginTextLabel label={this.translate('USERNAME / MOBILE NUMBER')} />
              <LoginTextInput
                placeholder={this.translate('Enter username or mobile #')}
                label={this.translate('Username / Mobile Number')}
                value={this.state.username}
                onChangeText={value => this.handleUsernameChange(value)}
              />              
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active={this.state.username.length > 1} onPress={this.handleRecoverButton} />
          </View>
        </LinearGradient>
      </View>
    )
  }
}

ForgotPasswordScreen.contextTypes = {
  t: PropTypes.func.isRequired
}

const LoginTextInput = (props) => {
  return (
    <TextInput
      autoCapitalize='none'
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

const mapStateToProps = state => {
  return {    
    recoveryData: state.recovery.recoveryData
  }
}

const mapDispatchToProps = dispatch => {
  return {    
    initForgotPassword: data => {
      dispatch(initForgotPassword(data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen)
