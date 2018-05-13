import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Amplify from 'aws-amplify'

// window.LOG_LEVEL = 'DEBUG'
let AWSExports = null

const envCi = require('env-ci')
const { isCi } = envCi()

if (isCi) {
  console.log('Building:CI')
  AWSExports = require('./src/aws-exports')
} else {
  console.log('Building:local')
  AWSExports = require('./src/aws-exports.js.donotcommit')
}

Amplify.configure(AWSExports)

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
