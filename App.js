import React from 'react'
import { Text, View } from 'react-native'
import { Font, AppLoading } from 'expo'
import Amplify from 'aws-amplify'
import awsExports from 'circles-mobile/aws-exports'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import SplashScreen from 'circles-mobile/lib/components/SplashScreen'
import ConnectScreen from 'circles-mobile/lib/components/ConnectScreen' // Add Container
import WalletScreen from 'circles-mobile/lib/components/WalletScreen'
// import TransactionScreen from 'circles-mobile/lib/components/TransactionScreen'
// import ConnectContainer from 'circles-mobile/lib/containers/ConnectContainer'

import HomeScreen from 'circles-mobile/lib/components/HomeScreen'
import ValidatePhone from 'circles-mobile/lib/components/Validate/ValidatePhone'
import ValidateSuccess from 'circles-mobile/lib/components/Validate/ValidateSuccess'

import addWallet from 'circles-mobile/lib/components/AddOrgWallet/AddWallet'
import addOffer from 'circles-mobile/lib/components/AddOrgWallet/AddOffer'
import addAdmin from 'circles-mobile/lib/components/AddOrgWallet/AddAdmin'

import PayAmount from 'circles-mobile/lib/components/Pay/PayAmount'
import RequestAmount from 'circles-mobile/lib/components/Request/RequestAmount'
import RequestQR from 'circles-mobile/lib/components/Request/RequestQR'
import RequestConfirm from 'circles-mobile/lib/components/Request/RequestConfirm'

import OrgAddInventory from 'circles-mobile/lib/components/OrgWallet/OrgAddInventory'
import OrgWalletScreen from 'circles-mobile/lib/components/OrgWallet/OrgWalletScreen'
import OrgWalletSettings from 'circles-mobile/lib/components/OrgWallet/OrgWalletSettingsScreen'

import Contacts from 'circles-mobile/lib/components/Contacts'

import Tabs from 'circles-mobile/lib/components/Tabs'
import { MenuProvider } from 'react-native-popup-menu'

const TxPlaceholder = () => (<View />)

let store = createStore(combineReducers({users: (state = {}, action) => state}))
Amplify.configure(awsExports)

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
  render () {
      // <Provider store={store}>
    return this.state.loading
          ? <AppLoading />
          : (<MenuProvider>
            <StartNavigator />
          </MenuProvider>)
      // </Provider>
  }
}

class Search extends React.Component {
  render () {
    return (
      <View>
        <Text>SEARCH</Text>
      </View>
    )
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
  Home: {
    screen: HomeScreen
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

const IntroNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Connect: {
    screen: ConnectScreen
  }}, {
    headerMode: 'none'
  })

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Transact: TxPlaceholder,
  Search: Search
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
  }
}, {
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
  }}, {
    headerMode: 'none'
  })

const StartNavigator = createStackNavigator({
  Main: {
    screen: MainNavigator
  }}, {
    mode: 'modal',
    headerMode: 'none'
  })

// export default withAuthenticator(App)
export default App
