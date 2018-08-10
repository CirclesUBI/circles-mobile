import React from 'react'
<<<<<<< HEAD
import { connect } from 'react-redux'
import { Alert, Image, Text, View, Dimensions, StyleSheet, Linking } from 'react-native'
import { Button } from 'antd-mobile-rn'
import { LinearGradient, Google, Facebook } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { secondary, fonts } from 'circles-mobile/lib/styles'
import randomString from 'random-string'
import URL from 'url-parse'
import qs from 'qs'
=======
import { Alert, Image, Text, View, Dimensions, StyleSheet } from 'react-native'
import { Linking } from 'expo'
import { Button } from 'antd-mobile-rn'
import { LinearGradient, Google, Facebook } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
>>>>>>> Uport Integration Finished

global.Buffer = require('buffer').Buffer

global.process = require('process')
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production'

var uportConnect = require('uport-connect/dist/uport-connect')
const { Connect, SimpleSigner } = uportConnect

const uuidv1 = require('uuid/v1')
const qs = require('qs')

const configureUportConnect = (config) => {

  const uriHandler = (url) => {
    Linking.openURL(url)
  }

  const uport = new Connect(config.appName, {
    clientId: config.appAddress,
    signer: SimpleSigner(config.privateKey),
    mobileUrlHandler: uriHandler,
    uriHandler: uriHandler,
  })

  uport.topicFactory = (name) => {
    const id = uuidv1()
    const url = `${config.appAddress}:${id}`
    let handler
    let cancel
    const topic = new Promise((resolve, reject) => {
      handler = (uri) => {
        if (uri && uri.url.startsWith(url)) {
          const decoded = uri.url.replace('%23', '#')
          const params = qs.parse(decoded.slice(decoded.search(/\#/)+1))
          if (params && params[name]) {
            Linking.removeEventListener('url', handler)
            resolve(params[name])
          } else {
            reject()
          }
        }
      }
      Linking.addEventListener('url', handler)

      cancel = () => {
        Linking.removeEventListener('url', handler)
        resolve()
      }
    })
    topic.url = url
    topic.cancel = cancel
    return topic
  }

  return {
    ...uportConnect,
    uport,
  }
}


const { uport, MNID } = configureUportConnect({
  appName: 'Circles',
  appAddress: '2odDf3tfWkap1kPqAHYm7ow2B1m2SisVK5M',
  privateKey: '93f02803e9de795913463b64285da23629892995e19691fe544ae4680c0ac671',
})

const web3 = uport.getWeb3()

const styles = StyleSheet.create({

  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 12

  },
  loginButton: {
    borderRadius: 7,
    borderWidth: 0,
    width: calculateWidthRatio(237),
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class ConnectScreen extends React.Component {
  constructor () {
    super()
    this.onGoogleLoginPress = this.onGoogleLoginPress.bind(this)
    this.onFacebookLoginPress = this.onFacebookLoginPress.bind(this)
  }
  async signInWithGoogleAsync () {
    try {
      const result = await Google.logInAsync({
        androidClientId: '965483631176-57qb5t3te2at460vgd23dn5o7140pgpn.apps.googleusercontent.com',
        iosClientId: '965483631176-oav4i9f33crrvi4oin1re68f17dn5qbi.apps.googleusercontent.com',
        scopes: ['profile']
      })

      if (result.type === 'success') {
        return result
      }
      return { cancelled: true }
    } catch (e) {
      return { error: e }
    }
  }
  async signInWithFacbookAsync () {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('249721718998242', {
        permissions: ['public_profile']
      })
      if (type === 'success') {
    // Get the user's name using Facebook's Graph API
        const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`)
        return response.json()
    // Alert.alert(
    //   'Logged in!',
    //   `Hi ${(await response.json()).name}!`,
    // );
      }
      return { cancelled: true }
    } catch (e) {
      return { error: e }
    }
  }
  async onGoogleLoginPress () {
    const result = await this.signInWithGoogleAsync()
    console.log(result)
    this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
    // if there is no result.error or result.cancelled, the user is logged in
    // do something with the result
  }

  async onFacebookLoginPress () {
    const result = await this.signInWithFacbookAsync()
    console.log(result)
    this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
  }
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={[secondary, '#160111']}
          style={{flex: 1, width: Dimensions.get('window').width}}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{height: 148, width: calculateWidthRatio(146), marginTop: calculateHeightRatio(98), resizeMode: 'contain'}}
              source={require('circles-mobile/images/logo.png')}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: calculateHeightRatio(180)}}>
            <Button onClick={() => {
              uport.requestCredentials({
                requested: ['name', 'avatar']
              }).then((result) => {
                console.log(result)
                //
                // Alert.alert(
                //     MNID.decode(result.address).address,
                //     JSON.stringify(result),
                //   [
                //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                //       {text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
                //   ],
                //     { cancelable: true }
                //   )
                this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
              }).catch(error => {
                console.log(error)
                this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
              })
              this.props.navigation.navigate('Tabs')
            }} style={[styles.loginButton, {backgroundColor: '#9353C8', marginBottom: calculateHeightRatio(20)}]}>
              <Text style={styles.loginText}>CONNECT WITH UPORT</Text>
            </Button>
            <Button onClick={() => {
              this.onFacebookLoginPress()
            }} style={[styles.loginButton, {backgroundColor: '#536EC8', marginBottom: calculateHeightRatio(23)}]}>
              <Text style={styles.loginText}>CONNECT WITH FACEBOOK</Text>
            </Button>
            <Button onClick={() => {
              this.onGoogleLoginPress()
            }} style={[styles.loginButton, {backgroundColor: '#F5F5F5', marginBottom: calculateHeightRatio(33)}]}>
              <Text style={[styles.loginText, {color: '#353535'}]}>CONNECT WITH GOOGLE</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wallets: state.wallets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectScreen)
