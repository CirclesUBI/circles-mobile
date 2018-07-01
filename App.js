import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { Navigation } from 'react-native-navigation'

import Amplify from 'aws-amplify'
import awsExports from './aws-exports'

import { withAuthenticator } from 'aws-amplify-react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

Amplify.configure(awsExports)

class AppHome extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TouchableHighlight onPress={() => this.props.navigation.replace('Tabs')}>
          <Text>Touch Me</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <StartNavigator />
    )
  }
}

class TabHome extends React.Component {
  render () {
    return <TabNavigator />
  }
}
class Home extends React.Component {
  render () {
    return (
      <View>
        <Text>HOME</Text>
      </View>
    )
  }
}
class Transact extends React.Component {
  render () {
    return (
      <View>
        <Text>TRANSACT</Text>
      </View>
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

const StartNavigator = createStackNavigator({
  Intro: {
    screen: AppHome
  },
  Tabs: {
    screen: TabHome
  }}, {
    headerMode: 'none'
  })

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Transact: Transact,
  Search: Search
}, {
  headerMode: 'none'
})

// export default withAuthenticator(App)
export default App
