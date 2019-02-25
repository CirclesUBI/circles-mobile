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
import { primary, background5, background4, background1, textColor3, textColor4, fonts } from 'circles-mobile/lib/styles'
import { numberWithCommas } from 'circles-mobile/lib/utilities'
import * as _ from 'lodash'

import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'

const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: fonts.boldText,
    color: 'white',
    fontSize: 16,
    marginLeft: 14
  },
  carouselStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    height: calculateHeightRatio(71),
    justifyContent: 'space-between',
    marginLeft: 23,
    marginRight: 23
  }
})

class HomeScreen extends React.Component {
  async logToken () {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.accessToken.jwtToken
    console.log(token)
  }
  componentDidMount () {
    this.props.getOrgs()
  }
  render () {
    this.logToken()
    let _renderItem = function ({ item, index }) {
      return (
        <View style={{ height: 200 }}>
          <ImageBackground style={{ height: calculateHeightRatio(201), width: calculateWidthRatio(327) }} source={item.profile_pic_url}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={{ fontFamily: fonts.titleText, color: 'white', fontSize: 20, marginLeft: 15, marginBottom: 5 }}>
                {item.organization_name}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )
    }
    let walletSelectionHandler = (wallet) => {
      this.props.selectWallet(wallet)
      // TODO fix logic here to switch to approriate wallet screen
      this.props.navigation.navigate('OrgHome')
    }
    let walletNames = Object.keys(this.props.wallets)
    let wallets = walletNames.map((wallet, i) => {
      if (this.props.user.selectedWallet !== wallet) {
        return <MenuOption onSelect={() => walletSelectionHandler(wallet)} key={i}>
          <Text style={{ fontSize: 20, fontFamily: fonts.primaryText }}>{wallet}</Text>
        </MenuOption>
      }
    })
    return (
      <View style={{ flex: 1, backgroundColor: background4 }}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{
            alignItems: 'center',
            backgroundColor: background1,
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
              this.props.navigation.toggleDrawer({ side: 'left' })
            }}>
              <Image style={{
                height: calculateHeightRatio(35),
                resizeMode: 'contain',
                width: calculateWidthRatio(35)
              }} source={require('circles-mobile/images/drawer.png')} />
            </TouchableHighlight>
            <Menu style={{ marginRight: 18 }}>
              <MenuTrigger>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{
                    color: 'white',
                    fontFamily: fonts.boldText,
                    fontSize: 20,
                    marginRight: 13
                  }}>{this.props.user.name}</Text>
                  <Image style={{
                    height: calculateHeightRatio(10),
                    width: calculateWidthRatio(18),
                    resizeMode: 'contain'
                  }} source={require('circles-mobile/images/arrowDown.png')} />
                </View>
              </MenuTrigger>
              <MenuOptions customStyles={{ optionsContainer: { marginTop: 30, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, borderTopLeftRadius: 6 } }}>
                {wallets}
                <MenuOption onSelect={() => this.props.navigation.navigate('addOrgWallet.AddWallet')}>
                  <Text style={{ color: textColor3, fontSize: 14, fontFamily: fonts.primaryText }}>
                    ⨁ Add Org Wallet
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View style={{
            alignItems: 'center',
            backgroundColor: background5,
            flexDirection: 'row',
            height: calculateHeightRatio(76),
            justifyContent: 'space-between'
          }}>
            <View style={{ flexDirection: 'column', marginLeft: 20 }}>
              <Text style={{ color: 'white', fontSize: 26, fontFamily: fonts.boldText }}>
                {numberWithCommas((_.find(this.props.wallets, (item) => item.primary === true)).balance)}
              </Text>
              <Text style={{ color: textColor4, fontSize: 14, fontFamily: fonts.primaryText }}>
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
              this.props.navigation.navigate('WalletView')
            }}>
              <Text style={{ fontFamily: fonts.primaryText, fontSize: 12, color: 'white' }}>View Wallet</Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <View style={{ height: calculateHeightRatio(272) }}>
            <View style={styles.carouselStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ height: calculateHeightRatio(31.4), resizeMode: 'contain' }}
                  source={require('circles-mobile/images/Marker.png')}
                />
                <Text style={styles.sectionHeading}>Nearby</Text>
              </View>
              {/* REMOVE MAP ICON UNTIL IMPLEMENTED */}
              {/* <Image
                style={{width: calculateWidthRatio(20), height: calculateHeightRatio(20), resizeMode: 'contain'}}
                source={require('circles-mobile/images/map.png')}
              /> */}
            </View>
            <Carousel
              ref={(c) => { this._carousel1 = c }}
              data={Object.keys(this.props.organizations).map(orgId => this.props.organizations[orgId])}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={calculateWidthRatio(327)}
            />
          </View>
          <View style={{ height: calculateHeightRatio(272), marginTop: 10, marginBottom: 20 }}>
            <View style={styles.carouselStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: calculateHeightRatio(31.4), resizeMode: 'contain' }} source={require('circles-mobile/images/recent.png')} />
                <Text style={styles.sectionHeading}>Recent</Text>
              </View>
            </View>
            <Carousel
              ref={(c) => { this._carousel1 = c }}
              data={Object.keys(this.props.organizations).map(orgId => this.props.organizations[orgId])}
              renderItem={_renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={calculateWidthRatio(327)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default HomeScreen
