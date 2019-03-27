import React from 'react'
import { connect } from 'react-redux'
import { Text, Image, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { fonts } from 'circles-mobile/lib/styles'
import { SafeAreaView } from 'react-navigation'

import { signOut } from 'circles-mobile/lib/actions/AuthActions'

const drawerLinks = [
  {label: 'Home', icon: require('circles-mobile/images/drawerIcons/home.png'), route: 'Home'},
  {label: 'Notifications', icon: require('circles-mobile/images/drawerIcons/notifications.png'), route: 'WalletView', params: {controlIndex: 1}},
  {label: 'My Personal Wallet', icon: require('circles-mobile/images/drawerIcons/personalWallet.png'), route: 'WalletView', params: {controlIndex: 0}},
  {label: 'My Secondary Wallets', icon: require('circles-mobile/images/drawerIcons/secondaryWallet.png'), route: 'OrgWalletView'},
  {label: 'Search People & Vendors', icon: require('circles-mobile/images/drawerIcons/search.png'), route: 'Search'},
  {label: 'Scan Code', icon: require('circles-mobile/images/drawerIcons/shutter.png'), route: 'Scanner'},
  {label: 'Invite Friends', icon: require('circles-mobile/images/drawerIcons/invite.png'), route: 'Contacts'},
  {label: 'Logout', icon: require('circles-mobile/images/drawerIcons/incomplete.png'), route: 'Main'}
  // {label: 'Purchases', icon: require('circles-mobile/images/drawerIcons/purchases.png')},
  // {label: 'Incomplete', icon: require('circles-mobile/images/drawerIcons/incomplete.png')},
  // {label: 'Get Help', icon: require('circles-mobile/images/drawerIcons/help.png')}
]

const DrawerComponent = (props) => {
  let links = drawerLinks.map((link, i) => (
    <TouchableWithoutFeedback key={i} onPress={async () => {
      if (link.label === 'Logout') {
        props.signOut()
      } else setTimeout(() => props.navigation.navigate(link.route, link.params), 600)
    }}>
      <View style={{flex: 1, height: calculateHeightRatio(60), borderBottomWidth: 1, borderColor: '#252525', flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{marginLeft: 21, resizeMode: 'contain'}} source={link.icon} />
        <Text style={{fontFamily: fonts.primaryText, color: 'white', fontSize: 14, marginLeft: 20}}>{link.label}</Text>
      </View>
    </TouchableWithoutFeedback>
  ))
  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
        {/* <DrawerItems {...props} /> */}
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {links}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.user.isSignedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerComponent)
