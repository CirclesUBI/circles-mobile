import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { createDrawerNavigator, SafeAreaView } from 'react-navigation'
import Carousel from 'react-native-snap-carousel'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground, mediumBackground, mediumDarkBackground, lightBackground } from 'circles-mobile/lib/styles/styles'
import WalletScreen from './WalletScreen'
const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: 'now-alt-bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 14
  }
})

class HomeScreen extends React.Component {
  _renderItem ({item, index}) {
    return (
      <View style={{height: 201}}>
        <ImageBackground style={{height: calculateHeightRatio(201), width: calculateWidthRatio(327)}} source={require('circles-mobile/images/cafe.png')}>
          {/* <Text>
            {item.body}
          </Text> */}
        </ImageBackground>
      </View>
    )
  }
  render () {
    return (
      <View style={{flex: 1, backgroundColor: mediumBackground}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: lightBackground, height: calculateHeightRatio(54), alignItems: 'center'}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, marginLeft: 18}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35)}} source={require('circles-mobile/images/drawer.png')} />
              {/* <SimpleLineIcons style={{alignSelf: 'center'}} name='menu' size={24} color='white' /> */}
            </TouchableHighlight>
            <Menu style={{marginRight: 18}}>
              <MenuTrigger>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 20, fontFamily: 'now-alt-bold', marginRight: 13}}>Ashoka Finley</Text>
                  <Image style={{height: calculateHeightRatio(10), width: calculateWidthRatio(18)}} source={require('circles-mobile/images/arrowDown.png')} />
                </View>

              </MenuTrigger>
              <MenuOptions customStyles={{optionsContainer: {marginTop: 30}}}>
                {/* <MenuOption>
                  <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>Ashoka Finley</Text>
                </MenuOption> */}
                <MenuOption onSelect={() => this.props.navigation.navigate('OrgWalletView')}>
                  <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>Knitted Socks</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.props.navigation.navigate('addOrgWallet.AddWallet')}>
                  <Text style={{color: '#AAAAAA', fontSize: 14, fontFamily: 'now-alt-regular'}}>
                    ⨁ Add Org Wallet
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View style={{backgroundColor: darkBackground, flexDirection: 'row', justifyContent: 'space-between', height: calculateHeightRatio(76), alignItems: 'center'}}>
            <View style={{flexDirection: 'column', marginLeft: 20}}>
              <Text style={{color: 'white', fontSize: 26, fontFamily: 'now-alt-bold'}}>
                1,000.00
              </Text>
              <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: 'now-alt-regular'}}>
                Circles
              </Text>
            </View>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginRight: 30, width: calculateWidthRatio(115), height: calculateHeightRatio(27), borderColor: primary, borderRadius: 5, borderWidth: 1}} onPress={() => {
              this.props.navigation.navigate('WalletView')
            }}>
              <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: 'white'}}>View Wallet</Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <View style={{height: calculateHeightRatio(272)}}>
            <View style={{height: calculateHeightRatio(71), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 23, marginRight: 23}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height: calculateHeightRatio(31.4)}} source={require('circles-mobile/images/Marker.png')} />
                <Text style={styles.sectionHeading}>Nearby</Text>
              </View>
              <Image style={{width: calculateWidthRatio(20), height: calculateHeightRatio(20)}} source={require('circles-mobile/images/map.png')} />
            </View>
            <Carousel
              ref={(c) => { this._carousel1 = c }}
              data={[{
                title: 'This is title',
                thumb: 'circles-mobile/images/cafe.png',
                body: 'Omg this is amazing'
              }, {
                title: 'This is title',
                thumb: 'circles-mobile/images/restaurant.png',
                body: 'Omg this is amazing'
              }]}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={calculateWidthRatio(327)}
            />
          </View>
          <View style={{height: calculateHeightRatio(272), marginTop: 10}}>
            <View style={{height: calculateHeightRatio(71), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 23, marginRight: 23}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height: calculateHeightRatio(31.4)}} source={require('circles-mobile/images/recent.png')} />
                <Text style={styles.sectionHeading}>Recent</Text>
              </View>
            </View>
            <Carousel
              ref={(c) => { this._carousel1 = c }}
              data={[{
                title: 'This is title',
                thumb: 'circles-mobile/images/restaurant.png',
                body: 'Omg this is amazing'
              }, {
                title: 'This is title',
                thumb: 'circles-mobile/images/cafe.png',
                body: 'Omg this is amazing'
              }]}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={calculateWidthRatio(327)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
const drawerLinks = [
  {label: 'Home', icon: require('circles-mobile/images/drawerIcons/home.png'), route: 'Home'},
  {label: 'Notifications', icon: require('circles-mobile/images/drawerIcons/notifications.png'), route: 'WalletView', params: {controlIndex: 1}},
  {label: 'My Personal Wallet', icon: require('circles-mobile/images/drawerIcons/personalWallet.png')},
  {label: 'My Secondary Wallets', icon: require('circles-mobile/images/drawerIcons/secondaryWallet.png')},
  {label: 'Search People & Vendors', icon: require('circles-mobile/images/drawerIcons/search.png')},
  {label: 'Scan Code', icon: require('circles-mobile/images/drawerIcons/shutter.png')},
  {label: 'Invite Friends', icon: require('circles-mobile/images/drawerIcons/invite.png')},
  {label: 'Purchases', icon: require('circles-mobile/images/drawerIcons/purchases.png')},
  {label: 'Incomplete', icon: require('circles-mobile/images/drawerIcons/incomplete.png')},
  {label: 'Get Help', icon: require('circles-mobile/images/drawerIcons/help.png')}
]

const DrawerComponent = (props) => {
  let links = drawerLinks.map((link, i) => (
    <TouchableWithoutFeedback key={i} onPress={() => {
      props.navigation.closeDrawer()
      props.navigation.navigate(link.route, link.params)
    }}>
      <View style={{flex: 1, height: calculateHeightRatio(60), borderBottomWidth: 1, borderColor: '#252525', flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{marginLeft: 21}} source={link.icon} />
        <Text style={{fontFamily: 'now-alt-regular', color: 'white', fontSize: 14, marginLeft: 20}}>{link.label}</Text>
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

const HomeNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  WalletView: {
    screen: WalletScreen
  }
}, {
  headerMode: 'none',
  contentComponent: DrawerComponent,
  drawerBackgroundColor: mediumDarkBackground,
  contentOptions: {
    items: ['Home', 'Splash'],
    activeTintColor: '#FFFFFF',
    itemsContainerStyle: {
      marginVertical: 0
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
})

export default HomeNavigator
