import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Amplify, { Analytics } from 'aws-amplify'
import AWSExports from './src/aws-exports'
// window.LOG_LEVEL = 'DEBUG'

debugger
console.log('debugger started')
Amplify.configure(AWSExports)

export default class App extends React.Component {
  render () {
    Analytics.record('appRender')
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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
