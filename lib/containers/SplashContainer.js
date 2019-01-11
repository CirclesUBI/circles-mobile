import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo'
import OnboardingLogo from '../components/Onboarding/OnboardingLogo'
import OnboardingIntro from '../components/Onboarding/OnboardingIntro'
import OnboardingLogin from '../components/Onboarding/OnboardingLogin'
import OnboardingButtons from '../components/Onboarding/OnboardingButtons'
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { addCognitoUserData, initSignIn, confirmSignIn } from 'circles-mobile/lib/actions/AuthActions'

import {
  secondary
} from 'circles-mobile/lib/styles'
import { NavigationActions, StackActions } from 'react-navigation'
// import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('SplashScreen')

class SplashContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDialingCode: '+49',
      phone: '4917643698891',
      password: 'testpass123'
    }
  }

  componentDidMount () {
    logger.info('Mounted')
    // if (this.props.authState === 'authorized') this.resetToHomeScreen()
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
        this.props.confirmSignIn(this.state.code)
          .then(this.props.navigation.navigate('HomeScreen'))
          .catch(err => logger.error(err))
      } else {
        let signInDetails = {
          phone: '+' + this.state.phone,
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
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <OnboardingLogo />
          <View style={{ flex: 1.45 }}>
            <ScrollView horizontal>
              <OnboardingIntro />
              <OnboardingLogin
                handlePhoneChange={this.handlePhoneChange}
                handlePasswordChange={this.handlePasswordChange}
                handleCodeChange={this.handleCodeChange}
                phone={this.state.phone}
                password={this.state.password}
                code={this.state.code}
                dialingCode={this.state.intlDialingCode}
              />
            </ScrollView>
          </View>
          <OnboardingButtons
            navigation={this.props.navigation}
            handleLoginButton={this.handleLoginButton}
            addCognitoUserData={this.props.addCognitoUserData}
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashContainer)
