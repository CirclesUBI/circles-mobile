import React from 'react'
import { Image, Text, View, TouchableHighlight, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'antd-mobile-rn'
import { LinearGradient } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

const styles = StyleSheet.create({
  general: {
    fontFamily: 'ostrich-sans-heavy'
  },
  loginText: {
    fontFamily: 'now-alt-medium',
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
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Provider } from 'react-redux'
// const Eth = require('circles/node_modules/ethjs-query/dist/ethjs-query.js')
// const UportConnect = require('circles/vendor/uport-connect')
// const Connect = UportConnect.ConnectCore
// const SimpleSigner = UportConnect.SimpleSigner
// var randomString = require('random-string')
// import URL from 'url-parse'
// import qs from 'qs'
//
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

// export const eth = new Eth(uport.getProvider())
// const req = {requested: ['name']}

class ConnectScreen extends React.Component {
  // _switchToTabBased() {
  //   Navigation.startTabBasedApp({
  //     tabs: [
  //       {
  //         label: 'Home',
  //         screen: 'HomeScreen',
  //         icon: {uri: this.state.homeIcon}
  //       },
  //       {
  //         label: 'Transfer',
  //         screen: 'TransactionScreen',
  //         icon: {uri: this.state.calculatorIcon}
  //       },
  //       {
  //         label: 'Search',
  //         screen: 'SearchScreen',
  //         icon: {uri: this.state.searchIcon}
  //       }
  //     ],
  //     drawer: { // optional, add this if you want a side menu drawer in your app
  //       right: { // optional, define if you want a drawer from the right
  //         screen: 'DrawerScreen', // unique ID registered with Navigation.registerScreen
  //         passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  //         fixedWidth: 500, // a fixed width you want your right drawer to have (optional)
  //       },
  //       style: { // ( iOS only )
  //    drawerShadow: true, // optional, add this if you want a side menu drawer shadow
  //    contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
  //         leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
  //         rightDrawerWidth: 50, // optional, add this if you want a define right drawer width (50=percent)
  //         shouldStretchDrawer: true // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
  //       },
  //       type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
  //       animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
  //                                           // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
  //       disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
  //     },
  //   })
  // }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={['#51023D', '#160111']}
          style={{flex: 1, width: Dimensions.get('window').width}}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{height: calculateHeightRatio(148), width: calculateWidthRatio(146), marginTop: calculateHeightRatio(98)}} source={require('circles-mobile/images/logo.png')} />
          </View>
          <View style={{alignItems: 'center', marginTop: calculateHeightRatio(180)}}>
            <Button onClick={() => {
              this.props.navigation.navigate('Tabs')
            }} style={[styles.loginButton, {backgroundColor: '#9353C8', marginBottom: calculateHeightRatio(20)}]}>
              <Text style={styles.loginText}>CONNECT WITH UPORT</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate('Tabs')
            }} style={[styles.loginButton, {backgroundColor: '#536EC8', marginBottom: calculateHeightRatio(23)}]}>
              <Text style={styles.loginText}>CONNECT WITH FACEBOOK</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate('Tabs')
            }} style={[styles.loginButton, {backgroundColor: '#F5F5F5', marginBottom: calculateHeightRatio(33)}]}>
              <Text style={[styles.loginText, {color: '#353535'}]}>CONNECT WITH GOOGLE</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default ConnectScreen
