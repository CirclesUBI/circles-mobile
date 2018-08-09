import React from 'react'
import { connect } from 'react-redux'
import { Alert, Image, Text, View, Dimensions, StyleSheet, Linking } from 'react-native'
import { Button } from 'antd-mobile-rn'
import { LinearGradient } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { secondary, fonts } from 'circles-mobile/lib/styles'
import randomString from 'random-string'
import URL from 'url-parse'
import qs from 'qs'

import configureUportConnect from 'react-native-uport-connect'

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

const Eth = require('circles-mobile/node_modules/ethjs-query/dist/ethjs-query.js')
// const UportConnect = require('uport-connect')
// const Connect = UportConnect.ConnectCore
// const SimpleSigner = UportConnect.SimpleSigner

// const rpcUrl = 'https://rinkeby.infura.io/dgC6Vl5Qvg79AZi8C39h'
// const circlesUport = '2odDf3tfWkap1kPqAHYm7ow2B1m2SisVK5M' // clientId from app manager
// const circlesKP = {
//   privateKey: '93f02803e9de795913463b64285da23629892995e19691fe544ae4680c0ac671' // private key from app manager
// }
//
// const circlesSigner = SimpleSigner(circlesKP.privateKey)
// // used to redirect the app link to uport application
// const uriHandler = (url) => {
//   Linking.openURL(url)
// }
//
// export const uport = new Connect('Circles', {
//   clientId: circlesUport,
//   signer: circlesSigner,
//   mobileUrlHandler: uriHandler,
//   uriHandler: uriHandler,
//   rpcUrl
// })
//
// uport.topicFactory = (name) => {
//   const id = randomString({length: 10})
//   const path = `/uport/${id}`
//   const url = `stream.circles.app:${path}`
//   let handler
//   let cancel
//   const topic = new Promise((resolve, reject) => {
//     handler = (event) => {
//       if (event.url) {
//         const url = URL(event.url, true)
//         if (url.pathname === path) {
//           if (url.hash) {
//             const params = qs.parse(url.hash.slice(1))
//             Linking.removeEventListener('url', handler)
//             resolve(params[name])
//           } else {
//             console.log('no hash')
//             reject()
//           }
//         } else {
//           console.log('ignoring request')
//         }
//       }
//     }
//     Linking.addEventListener('url', handler)
//
//     cancel = () => {
//       Linking.removeEventListener('url', handler)
//       resolve()
//     }
//   })
//   topic.url = url
//   topic.cancel = cancel
//   return topic
// }
//
// export const eth = new Eth(uport.getProvider())
// const req = {requested: ['name']}

class ConnectScreen extends React.Component {
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
              // uport.requestCredentials(req).then((credentials) => {
              //   console.log(credentials)
              //   this.props.navigation.navigate('Tabs')
              // })
            }} style={[styles.loginButton, {backgroundColor: '#9353C8', marginBottom: calculateHeightRatio(20)}]}>
              <Text style={styles.loginText}>CONNECT WITH UPORT</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
            }} style={[styles.loginButton, {backgroundColor: '#536EC8', marginBottom: calculateHeightRatio(23)}]}>
              <Text style={styles.loginText}>CONNECT WITH FACEBOOK</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
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
