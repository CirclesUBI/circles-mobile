import React from 'react'
import { Image, Text, View, ScrollView, TouchableHighlight, Dimensions, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, secondary, width, height } from 'circles-mobile/lib/styles/styles'

const styles = StyleSheet.create({
  general: {
    fontFamily: 'ostrich-sans-heavy',
    color: 'white',
    textAlign: 'center'
  },
  general2: {
    fontFamily: 'now-alt-regular',
    color: 'white',
    textAlign: 'center'
  },
  loginText: {
    fontFamily: 'now-alt-medium',
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    width: width / 2,
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class SplashScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={['#51023D', '#160111']}
          style={{flex: 1}}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: calculateHeightRatio(66)}}>
            <Image style={{width: calculateWidthRatio(190), height: calculateHeightRatio(192)}} source={require('circles-mobile/images/logo.png')} />
          </View>
          <View style={{flex: 1.45}}>
            <ScrollView horizontal>
              <View style={{width: width, height: height - 200, alignItems: 'center', marginTop: 20}}>
                <Text style={[{
                  fontSize: 24,
                  width: calculateWidthRatio(115),
                  marginTop: 10
                }, styles.general]}>Welcome to</Text>
                <Text style={[{
                  fontSize: 60
                }, styles.general]}>Circles</Text>
                <Text style={[{
                  fontSize: 12,
                  width: calculateWidthRatio(224),
                  marginTop: 20}, styles.general2]}>
                  Circles is a universal basic income based on a network of trust.
                </Text>
                <Text style={[{
                  fontSize: 12,
                  width: calculateWidthRatio(224),
                  marginTop: 20}, styles.general2]}>
                  Invite frieds you know and trust into the Circles system in order to exchange money with them!
                </Text>
                {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
              </View>
              <View style={{ width: width, height: height - 100, alignItems: 'center' }} />
            </ScrollView>
          </View>
          <View style={{flex: 0.25, backgroundColor: 'white', flexDirection: 'row'}}>
            <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
              this.props.navigation.push('Connect')
            }}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.loginButton, {backgroundColor: secondary}]} onPress={() => {
              this.props.navigation.push('Connect')
            }}>
              <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableHighlight>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default SplashScreen
