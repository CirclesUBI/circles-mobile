import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Font } from 'expo'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import SplashScreen from './lib/components/SplashScreen'
import ConnectScreen from './lib/components/ConnectScreen' // Add Container
import WalletScreen from './lib/components/WalletScreen'
// import TransactionScreen from './lib/components/TransactionScreen'
// import ConnectContainer from './lib/containers/ConnectContainer'

import HomeScreen from './lib/components/HomeScreen'
import ValidatePhone from './lib/components/Validate/ValidatePhone'
import ValidateSuccess from './lib/components/Validate/ValidateSuccess'

import addWallet from './lib/components/AddOrgWallet/AddWallet'
import addOffer from './lib/components/AddOrgWallet/AddOffer'
import addAdmin from './lib/components/AddOrgWallet/AddAdmin'

import PayAmount from './lib/components/Pay/PayAmount'
import RequestAmount from './lib/components/Request/RequestAmount'

import OrgAddInventory from './lib/components/OrgWallet/OrgAddInventory'
import OrgWalletScreen from './lib/components/OrgWallet/OrgWalletScreen'
import OrgWalletSettings from './lib/components/OrgWallet/OrgWalletSettingsScreen'

import Tabs from './lib/components/Tabs'
import { MenuProvider } from 'react-native-popup-menu'

const TxPlaceholder = () => (<View />)

let store = createStore(combineReducers({users: (state = {}, action) => state}))
Amplify.configure(awsExports)

class App extends React.Component {
  async componentWillMount () {
    await Font.loadAsync({
      'ostrich-sans-heavy': require('./assets/fonts/OstrichSans-Heavy.otf'),
      'now-alt-regular': require('./assets/fonts/NowAlt-Regular.otf'),
      'now-alt-medium': require('./assets/fonts/NowAlt-Medium.otf'),
      'now-alt-bold': require('./assets/fonts/NowAlt-Bold.otf')
    })
  }
  render () {
    return (
      <Provider store={store}>
        <MenuProvider>
          <StartNavigator />
        </MenuProvider>
      </Provider>
    )
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
  }
}, {
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
