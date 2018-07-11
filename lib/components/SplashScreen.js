import React from 'react'
import { Image, Text, View, ScrollView, TouchableHighlight, Dimensions } from 'react-native'

class SplashScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'black'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{height: 100, width: 100}} source={require('circles-mobile/images/logo.png')} />
        </View>
        <View style={{flex: 2}}>
          <ScrollView horizontal>
            <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height - 200, alignItems: 'center'}}>
              <Text style={{marginTop: 20, fontSize: 40, color: 'white', textAlign: 'center'}}>Welcome to Circles</Text>
              <Text style={{marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center'}}>Circles is a universal basic income based on a network of trust.</Text>
              <Text style={{marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center'}}>Invite frieds you know and trust into the Circles system in order to exchange money with them!</Text>
              <Text style={{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}}>Swipe to learn more</Text>
            </View>
            <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100, alignItems: 'center' }} />
          </ScrollView>
        </View>
        <View style={{flex: 0.25, backgroundColor: 'white', flexDirection: 'row'}}>
          <TouchableHighlight style={{width: Dimensions.get('window').width / 2, height: 50, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1}} onPress={() => {
            this.props.navigation.push('Connect')
          }}>
            <Text>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{width: Dimensions.get('window').width / 2, height: 50, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1}} onPress={() => {
            this.props.navigation.push('Connect')
          }}>
            <Text>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default SplashScreen
