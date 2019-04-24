import React from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'
import OnboardingLogo from '../components/Onboarding/splash/OnboardingLogo'
import OnboardingIntro from '../components/Onboarding/splash/OnboardingIntro'
import OnboardingButtons from '../components/Onboarding/splash/OnboardingButtons'
import {
  secondary
} from 'circles-mobile/lib/styles'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

// Actions
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { initSignIn } from 'circles-mobile/lib/actions/AuthActions'
import { selectWallet } from 'circles-mobile/lib/actions/AppActions'

import { NavigationActions, StackActions } from 'react-navigation'
import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'
const logger = new ConsoleLogger('SplashScreen')

class SplashContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: '+',
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

  handleLoginButton () {
    this.props.navigation.push('Login')
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
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, flexDirection: 'column' }}>
          <OnboardingLogo style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <OnboardingIntro />
          </View>
          <OnboardingButtons
            navigation={this.props.navigation}
            handleLoginButton={this.handleLoginButton}
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
    authState: state.app.authState,
    lang: state.i18nState.lang
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
    selectWallet: data => dispatch(selectWallet(data))    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashContainer)
