import React from 'react'
import { Font, AppLoading } from 'expo'
import { Provider } from 'react-redux'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import SplashScreen from 'circles-mobile/lib/components/SplashScreen'
import TermsConditionsScreen from 'circles-mobile/lib/components/Onboarding/OnboardingTerms'
import AvatarScreen from 'circles-mobile/lib/components/Onboarding/OnboardingAvatar'
import PhoneScreen from 'circles-mobile/lib/components/Onboarding/OnboardingPhone'
import VerifyPhoneScreen from 'circles-mobile/lib/components/Onboarding/OnboardingVerifyPhone'
import TestnetScreen from 'circles-mobile/lib/components/Onboarding/OnboardingTestnetWarning'
import CompleteScreen from 'circles-mobile/lib/components/Onboarding/OnboardingComplete'

import ConnectScreen from 'circles-mobile/lib/components/ConnectScreen' // Add Container
import WalletScreen from 'circles-mobile/lib/components/WalletScreen'
// import TransactionScreen from 'circles-mobile/lib/components/TransactionScreen'
// import ConnectContainer from 'circles-mobile/lib/containers/ConnectContainer'

import HomeDrawerNavigator from 'circles-mobile/lib/navigators/HomeNavigator'
import ValidatePhone from 'circles-mobile/lib/components/Validate/ValidatePhone'
import ValidateSuccess from 'circles-mobile/lib/components/Validate/ValidateSuccess'

import addWallet from 'circles-mobile/lib/components/AddOrgWallet/AddWallet'
import addOffer from 'circles-mobile/lib/components/AddOrgWallet/AddOffer'
import addAdmin from 'circles-mobile/lib/components/AddOrgWallet/AddAdmin'

import PayAmount from 'circles-mobile/lib/components/Pay/PayAmount'
import PayConfirm from 'circles-mobile/lib/components/Pay/PayConfirm'

import RequestAmount from 'circles-mobile/lib/components/Request/RequestAmount'
import RequestQR from 'circles-mobile/lib/components/Request/RequestQR'
import RequestConfirm from 'circles-mobile/lib/components/Request/RequestConfirm'

import OrgAddInventory from 'circles-mobile/lib/components/OrgWallet/OrgAddInventory'
import OrgWalletScreen from 'circles-mobile/lib/components/OrgWallet/OrgWalletScreen'
import OrgWalletSettings from 'circles-mobile/lib/components/OrgWallet/OrgWalletSettingsScreen'

import OrgHomeDrawerNavigator from 'circles-mobile/lib/navigators/OrgHomeNavigator'
import Contacts from 'circles-mobile/lib/components/Contacts'

import SearchScreen from 'circles-mobile/lib/containers/SearchContainer'
import Scanner from 'circles-mobile/lib/components/Scanner/Scanner'

import Tabs from 'circles-mobile/lib/components/Tabs'
import { MenuProvider } from 'react-native-popup-menu'
import store from 'circles-mobile/lib/store'

import Amplify from 'aws-amplify'
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_rv2E00jts',

    userPoolWebClientId: 'vge305k71c52llf5ja6rh04pf',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,

    // // OPTIONAL - Configuration for cookie storage
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: '.joincircles.net',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - Cookie secure flag
    //   secure: true
    // },

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    endpoints: [
      {
        name: 'circles',
        endpoint: 'http://circles-api-alb-522636929.eu-central-1.elb.amazonaws.com:8080'
      }
    ]
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }
  async componentWillMount () {
    await Font.loadAsync({
      'ostrich-sans-heavy': require('circles-mobile/assets/fonts/OstrichSans-Heavy.otf'),
      'now-alt-regular': require('circles-mobile/assets/fonts/NowAlt-Regular.otf'),
      'now-alt-medium': require('circles-mobile/assets/fonts/NowAlt-Medium.otf'),
      'now-alt-bold': require('circles-mobile/assets/fonts/NowAlt-Bold.otf')
    })
    this.setState({loading: false})
  }

  // componentDidMount () {
  //   console.log('component did mount')
  //   // 1) Create User Pool
  //   this.userPool = new CognitoUserPool({
  //     UserPoolId: 'us-east-1_jcaaanek3',
  //     ClientId: '1bo5b9n2kmhu12s6ofb6b6qhkq'
  //   })
  // }

  render () {
    // <Provider store={store}>
    return this.state.loading
      ? <AppLoading />
      : (<Provider store={store}>
        <MenuProvider>
          <StartNavigator />
        </MenuProvider>
      </Provider>)
  }
}

const ValidateNavigator = createStackNavigator({
  ValidatePhone: {
    screen: ValidatePhone
  },
  ValidateSuccess: {
    screen: ValidateSuccess
  }
}, {
  headerMode: 'none'
})

const HomeNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeDrawerNavigator
  },
  WalletView: {
    screen: WalletScreen
  },
  OrgWalletView: {
    screen: OrgWalletScreen
  },
  Validate: {
    screen: ValidateNavigator
  }}, {
  headerMode: 'none'
})

const OrgHomeNavigator = createStackNavigator({
  OrgHome: {
    screen: OrgHomeDrawerNavigator
  },
  OrgWalletView: {
    screen: OrgWalletScreen
  }}, {
  headerMode: 'none'
})

const IntroNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Terms: {
    screen: TermsConditionsScreen
  },
  Avatar: {
    screen: AvatarScreen
  },
  Phone: {
    screen: PhoneScreen
  },
  VerifyPhone: {
    screen: VerifyPhoneScreen
  },
  Testnet: {
    screen: TestnetScreen
  },
  Complete: {
    screen: CompleteScreen
  },
  Connect: {
    screen: ConnectScreen
  }
}, {
  headerMode: 'none'
})

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  OrgHomeView: OrgHomeNavigator,
  Search: SearchScreen
}, {
  headerMode: 'none',
  tabBarComponent: Tabs
})

const OrgWalletNavigator = createStackNavigator({
  'addOrgWallet.AddWallet': {
    screen: addWallet
  },
  'addOrgWallet.AddOffer': {
    screen: addOffer
  },
  'addOrgWallet.AddAdmin': {
    screen: addAdmin
  }}, {
  headerMode: 'none'
})

const RequestNavigator = createStackNavigator({
  'RequestAmount': {
    screen: RequestAmount
  },
  'RequestQR': {
    screen: RequestQR
  },
  'RequestContacts': {
    screen: Contacts
  },
  'RequestConfirm': {
    screen: RequestConfirm
  }}, {
  headerMode: 'none'
})

const PayNavigator = createStackNavigator({
  'PayAmount': {
    screen: PayAmount
  },
  'PayContacts': {
    screen: Contacts
  },
  'PayConfirm': {
    screen: PayConfirm
  }}, {
  headerMode: 'none'
})

const MainNavigator = createStackNavigator({
  Intro: {
    screen: IntroNavigator
  },
  Tabs: {
    screen: TabNavigator
  },
  'addOrgWallet': {
    screen: OrgWalletNavigator
  },
  'OrgWalletSettings': {
    screen: OrgWalletSettings
  },
  OrgInventory: {
    screen: OrgAddInventory
  },
  'Pay': {
    screen: PayNavigator
  },
  'Request': {
    screen: RequestNavigator
  },
  'Contacts': {
    screen: Contacts
  },
  'Scanner': {
    screen: Scanner
  }}, {
  headerMode: 'none'
})

const StartNavigator = createStackNavigator({
  Main: {
    screen: MainNavigator
  },
  'Scanner': {
    screen: Scanner
  }}, {
  mode: 'modal',
  headerMode: 'none'
})

// export default withAuthenticator(App)
export default App
