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
import { fetchCurrentCountry } from 'circles-mobile/lib/actions/OnboardingActions'
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
import * as _ from 'lodash'

import { Auth } from 'aws-amplify'

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

  componentDidMount () {
    console.log('splash')
    let username = '+4917643698891'
    let password = 'bl8hbl8h'

    this.signUp(username, password)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        if (err.code === 'UsernameExistsException') {
          console.log('username exists')
          this.signIn(username, password)
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
        else if (err.code === 'UserNotConfirmedException') return Auth.resendSignUp(username)
      })
    }
        
          
      //   Auth.setPreferredMFA(data.user, 'SMS').then((data) => {
      //       console.log(data);
      //       // ...
      //   }).catch(e => console.log(e));

      //   Auth.currentAuthenticatedUser()
      //     .then(user => {
      //       console.log('user', user)
      //       return Auth.verifyCurrentUserAttribute('phone_number');
      //     }).catch((e) => {
      //       console.log('failed with error', e);
      //     })
      //   // Auth.verifyCurrentUserAttribute(data.user, 'phone_number')
      //   //   .then(() => {
      //   //     console.log('a verification code is sent');
      //   //   }).catch((e) => {
      //   //     console.log('failed with error', e);
      //   //   })
      // })//this.sendVerificationCode())
      // .catch(err => {
      //   console.log(err)
      //   if (err.code === 'UsernameExistsException') console.log('username exists')
      //   else if (err.code === 'UserNotConfirmedException') {
      //     Auth.verifyUserAttribute(username, 'phone_number')
      //       .then(() => {
      //         console.log('a verification code is sent');
      //       }).catch((e) => {
      //         console.log('failed with error', e);
      //       })
      //   }
      // })
  // }

  async signIn (username, password) {
    return Auth.signIn(username, password)
  }

  async signUp (username, password) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        name: 'edzillion',
        phone_number: '+4917643698891'
      }
    })
  }

  async sendVerificationCode () {
    return Auth.verifyCurrentUserAttribute('phone_number')
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
          {_.isEmpty(this.props.wallets) ? (
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
                <Text style={styles.loginText}>SIGN UP</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={{ flex: 0.25, flexDirection: 'row' }}>
              <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: primary }]}
                onPress={() => {
                  this.props.navigation.push('Connect')
                }}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: secondary }]}
                onPress={() => {
                  this.props.navigation.push('Terms')
                }}
              >
                <Text style={styles.loginText}>SIGN UP</Text>
              </TouchableHighlight>
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
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SplashScreen)
