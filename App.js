import React from 'react'
import { Text, View } from 'react-native'
// import Expo from 'expo'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'

import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import SplashScreen from './lib/components/SplashScreen'
import ConnectScreen from './lib/components/ConnectScreen' // Add Container
import WalletScreen from './lib/components/WalletScreen'
import TransactionScreen from './lib/components/TransactionScreen'
// import ConnectContainer from './lib/containers/ConnectContainer'
import HomeScreen from './lib/components/HomeScreen'
import ValidateScreen from './lib/components/ValidateScreen'

import addWallet from './lib/components/AddOrgWallet/AddWallet'
import addOffer from './lib/components/AddOrgWallet/AddOffer'
import addAdmin from './lib/components/AddOrgWallet/AddAdmin'

import { MenuProvider } from 'react-native-popup-menu'

Amplify.configure(awsExports)

class App extends React.Component {
  // async componentWillMount () {
  //   await Expo.Font.loadAsync({
  //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
  //   })
  // }
  render () {
    return (
      <MenuProvider>
        <StartNavigator />
      </MenuProvider>
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
    screen: ValidateScreen
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
  Transact: TransactionScreen,
  Search: Search
}, {
  headerMode: 'none',
  cardStyle: {
    opacity: 0.1
  }
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

const MainNavigator = createStackNavigator({
  Intro: {
    screen: IntroNavigator
  },
  Tabs: {
    screen: TabNavigator
  },
  'addOrgWallet': {
    screen: OrgWalletNavigator
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
