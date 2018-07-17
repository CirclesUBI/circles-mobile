import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions, Image, ImageBackground } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import { Card } from 'antd-mobile-rn'
import Carousel from 'react-native-snap-carousel'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { SimpleLineIcons } from '@expo/vector-icons'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Home',
  //   // drawerIcon: ({ tintColor }) => (
  //   //   <Image
  //   //     source={require('./chats-icon.png')}
  //   //     style={[styles.icon, {tintColor: tintColor}]}
  //   //   />
  //   // ),
  // }
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
      <View style={{flex: 1, backgroundColor: '#161724'}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#282A3E', height: calculateHeightRatio(54), alignItems: 'center'}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, marginLeft: 18}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='menu' size={24} color='white' />
            </TouchableHighlight>
            <Menu style={{marginRight: 18}}>
              <MenuTrigger>
                <Text style={{color: 'white', fontSize: 20, fontFamily: 'now-alt-bold'}}>Ashoka Finley ▼</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption text='Ashoka Finley' />
                <MenuOption onSelect={() => this.props.navigation.navigate('OrgWalletView')} text={'Knitting Socks'} />
                <MenuOption onSelect={() => this.props.navigation.navigate('addOrgWallet.AddWallet')} text={'⨁ Add Org Wallet'} />
              </MenuOptions>
            </Menu>
          </View>
          <View style={{backgroundColor: '#0D101E', flexDirection: 'row', justifyContent: 'space-between', height: calculateHeightRatio(76), alignItems: 'center'}}>
            <View style={{flexDirection: 'column', marginLeft: 20}}>
              <Text style={{color: 'white', fontSize: 26, fontFamily: 'now-alt-bold'}}>
                1,000.00
              </Text>
              <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: 'now-alt-regular'}}>
                Circles
              </Text>
            </View>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginRight: 30, width: calculateWidthRatio(115), height: calculateHeightRatio(27), borderColor: '#53C894', borderRadius: 5, borderWidth: 1}} onPress={() => {
              this.props.navigation.navigate('WalletView')
              // Navigation.showModal({
              //   screen: 'WalletScreen',
              //   navigatorStyle: {
              //     navBarHidden: true
              //   }
              // })
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
                <Text style={{fontFamily: 'now-alt-bold', color: 'white', fontSize: 16, marginLeft: 14}}>Nearby</Text>
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
                <Image style={{height: calculateWidthRatio(31.4)}} source={require('circles-mobile/images/recent.png')} />
                <Text style={{fontFamily: 'now-alt-bold', color: 'white', fontSize: 16, marginLeft: 14}}>Recent</Text>
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

const HomeNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  }}, {
    headerMode: 'none'
  })

export default HomeNavigator
