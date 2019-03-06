import React from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import OnboardingLogo from '../components/Onboarding/splash/OnboardingLogo'
import OnboardingIntro from '../components/Onboarding/splash/OnboardingIntro'
import OnboardingButtons from '../components/Onboarding/splash/OnboardingButtons'
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import { addCognitoUserData, initSignIn, confirmSignIn } from 'circles-mobile/lib/actions/AuthActions'
import { selectWallet } from 'circles-mobile/lib/actions/AppActions'

import {
  secondary
} from 'circles-mobile/lib/styles'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

import { NavigationActions, StackActions } from 'react-navigation'
// import API from '@aws-amplify/api'
import { ConsoleLogger } from '@aws-amplify/core'

const logger = new ConsoleLogger('SplashScreen')

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
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <OnboardingLogo style={{ marginTop: calculateHeightRatio(66) }} />
          <View style={{ flex: 1.45 }}>
            <OnboardingIntro />
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
