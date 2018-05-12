import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Amplify from 'aws-amplify'
import awsExports from './src/aws-exports'

// window.LOG_LEVEL = 'DEBUG'

Amplify.configure(awsExports)

export default class App extends React.Component {
  render () {
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
