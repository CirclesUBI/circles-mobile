import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions, Image, ImageBackground, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground, mediumBackground, lightBackground } from 'circles-mobile/lib/styles/styles'

const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: 'now-alt-bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 14
  }
})

function numberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const HomeScreen = (props) => {
  let _renderItem = function ({item, index}) {
    return (
      <View style={{height: 201}}>
        <ImageBackground style={{height: calculateHeightRatio(201), width: calculateWidthRatio(327)}} source={item.thumb}>
          {/* <Text>
            {item.body}
          </Text> */}
        </ImageBackground>
      </View>
    )
  }
  let walletNames = Object.keys(props.wallets)
  let wallets = walletNames.map((wallet, i) => (
    <MenuOption onSelect={() => props.navigation.navigate('OrgHome')}>
      <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>{walletNames[i]}</Text>
    </MenuOption>
  ))
  return (
    <View style={{flex: 1, backgroundColor: mediumBackground}}>
      <View style={{flexDirection: 'column'}}>
        <View style={{
          alignItems: 'center',
          backgroundColor: lightBackground,
          flexDirection: 'row',
          height: calculateHeightRatio(54),
          justifyContent: 'space-between',
          marginTop: 20
        }}>
          <TouchableHighlight style={{
            alignItems: 'center',
            height: 30,
            justifyContent: 'center',
            marginLeft: 18
          }} onPress={() => {
            props.navigation.toggleDrawer()
          }}>
            <Image style={{
              height: calculateHeightRatio(35),
              resizeMode: 'contain',
              width: calculateWidthRatio(35)
            }} source={require('circles-mobile/images/drawer.png')} />
          </TouchableHighlight>
          <Menu style={{marginRight: 18}}>
            <MenuTrigger>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{
                  color: 'white',
                  fontFamily: 'now-alt-bold',
                  fontSize: 20,
                  marginRight: 13
                }}>{props.user.name}</Text>
                <Image style={{
                  height: calculateHeightRatio(10),
                  width: calculateWidthRatio(18),
                  resizeMode: 'contain'
                }} source={require('circles-mobile/images/arrowDown.png')} />
              </View>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {marginTop: 30}}}>
              {wallets}
              <MenuOption onSelect={() => props.navigation.navigate('addOrgWallet.AddWallet')}>
                <Text style={{color: '#AAAAAA', fontSize: 14, fontFamily: 'now-alt-regular'}}>
                  ⨁ Add Org Wallet
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={{
          alignItems: 'center',
          backgroundColor: darkBackground,
          flexDirection: 'row',
          height: calculateHeightRatio(76),
          justifyContent: 'space-between'
        }}>
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{color: 'white', fontSize: 26, fontFamily: 'now-alt-bold'}}>
              {numberWithCommas(props.user.balance)}
            </Text>
            <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: 'now-alt-regular'}}>
              Circles
            </Text>
          </View>
          <TouchableHighlight style={{
            alignItems: 'center',
            borderColor: primary,
            borderRadius: 5,
            borderWidth: 1,
            height: calculateHeightRatio(27),
            justifyContent: 'center',
            marginRight: 30,
            width: calculateWidthRatio(115)
          }} onPress={() => {
            props.navigation.navigate('WalletView')
          }}>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: 'white'}}>View Wallet</Text>
          </TouchableHighlight>
        </View>
      </View>
      <ScrollView>
        <View style={{height: calculateHeightRatio(272)}}>
          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            height: calculateHeightRatio(71),
            justifyContent: 'space-between',
            marginLeft: 23,
            marginRight: 23
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: calculateHeightRatio(31.4), resizeMode: 'contain'}}
                source={require('circles-mobile/images/Marker.png')}
              />
              <Text style={styles.sectionHeading}>Nearby</Text>
            </View>
            <Image
              style={{width: calculateWidthRatio(20), height: calculateHeightRatio(20), resizeMode: 'contain'}}
              source={require('circles-mobile/images/map.png')}
            />
          </View>
          <Carousel
            ref={(c) => { this._carousel1 = c }}
            data={props.vendors.vendorList}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={calculateWidthRatio(327)}
          />
        </View>
        <View style={{height: calculateHeightRatio(272), marginTop: 10, marginBottom: 20}}>
          <View style={{
            height: calculateHeightRatio(71),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 23,
            marginRight: 23
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height: calculateHeightRatio(31.4), resizeMode: 'contain'}} source={require('circles-mobile/images/recent.png')} />
              <Text style={styles.sectionHeading}>Recent</Text>
            </View>
          </View>
          <Carousel
            ref={(c) => { this._carousel1 = c }}
            data={props.vendors.vendorList}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={calculateWidthRatio(327)}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
