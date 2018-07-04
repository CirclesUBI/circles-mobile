import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
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

import addOrgWallet from './lib/components/AddOrgWallet/AddWallet'

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
      <StartNavigator />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  WalletView: {
    screen: WalletScreen
  },
  Validate: {
    screen: ValidateScreen
  }}, {
    headerMode: 'none'
  })

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Transact: TransactionScreen,
  Search: Search
}, {
  headerMode: 'none'
})

const IntroNavigator = createStackNavigator({
  Intro: {
    screen: SplashScreen
  },
  Connect: {
    screen: ConnectScreen
  }}, {
    headerMode: 'none'
  })

const MainNavigator = createStackNavigator({
  Intro: {
    screen: IntroNavigator
  },
  Tabs: {
    screen: TabNavigator
  }}, {
    headerMode: 'none'
  })
const StartNavigator = createStackNavigator({
  Main: {
    screen: MainNavigator
  },
  // WalletView: {
  //   screen: WalletScreen
  // },
  'addOrgWallet.AddWallet': {
    screen: addOrgWallet
  }}, {
    mode: 'modal',
    headerMode: 'none'
  })

// export default withAuthenticator(App)
export default App
