import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo'
import { addData, fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  primary,
  secondary,
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

import AuthManager from 'circles-mobile/lib/components/AuthManager'

import { NavigationActions, StackActions } from 'react-navigation'

const styles = StyleSheet.create({
  general: {
    fontFamily: fonts.titleText,
    color: 'white',
    textAlign: 'center'
  },
  general2: {
    fontFamily: fonts.primaryText,
    color: 'white',
    textAlign: 'center'
  },
  loginText: {
    fontFamily: fonts.secondaryText,
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
  constructor (props) {
    super(props)
    this.state = {
      signedIn: false
    }
  }

  componentDidMount () {
    AuthManager.isSignedInAWS()
      .then(signedIn => {
        let resetAction
        if (signedIn) {
          resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate('HomeScreen')
            ]
          })
          this.props.navigation.dispatch(resetAction)
        }
        this.setState({ signedIn: signedIn })
      }).catch(err => console.error(err))
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: calculateHeightRatio(66)
            }}
          >
            <Image
              style={{
                width: calculateWidthRatio(190),
                height: calculateHeightRatio(192),
                resizeMode: 'contain'
              }}
              source={require('circles-mobile/images/logo.png')}
            />
          </View>
          <View style={{ flex: 1.45 }}>
            <ScrollView horizontal>
              <View
                style={{
                  width: width,
                  height: height - 200,
                  alignItems: 'center',
                  marginTop: 20
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: 24,
                      width: calculateWidthRatio(115),
                      marginTop: 10
                    },
                    styles.general
                  ]}
                >
                  Welcome to
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 60
                    },
                    styles.general
                  ]}
                >
                  Circles
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 12,
                      width: calculateWidthRatio(224),
                      marginTop: 20
                    },
                    styles.general2
                  ]}
                >
                  Circles is a universal basic income based on a network of
                  trust.
                </Text>
                <Text
                  style={[
                    {
                      fontSize: 12,
                      width: calculateWidthRatio(224),
                      marginTop: 20
                    },
                    styles.general2
                  ]}
                >
                  Invite friends you know and trust into the Circles system in
                  order to exchange money with them!
                </Text>
                {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
              </View>
              <View
                style={{
                  width: width,
                  height: height - 100,
                  alignItems: 'center'
                }}
              />
            </ScrollView>
          </View>
          {(!this.state.signedIn) ? (
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <TouchableHighlight
                style={[
                  styles.loginButton,
                  { backgroundColor: secondary, width: width }
                ]}
                onPress={() => {
                  this.props.navigation.push('Terms')
                }}
              >
                <Text style={styles.loginText}>
                  SIGN UP
                </Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: primary, width: width }]}
                onPress={() => {
                  this.props.navigation.navigate('HomeScreen')
                }}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableHighlight>
              {/* <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: secondary }]}
                onPress={() => {
                  this.props.navigation.push('Terms')
                }}
              >
                <Text style={styles.loginText}>
                  SIGN UP
                </Text>
              </TouchableHighlight> */}
            </View>
          )}
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    wallets: state.wallets
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentCountry: () => {
      dispatch(fetchCurrentCountry())
    },
    addData: data => {
      dispatch(addData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)
