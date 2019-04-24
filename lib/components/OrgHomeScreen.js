import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, background4, background1, fonts } from 'circles-mobile/lib/styles'
import { numberWithCommas } from 'circles-mobile/lib/utilities'

const OrgHomeScreen = (props, {t: translate}) => {
  let walletSelectionHandler = (wallet) => {
    props.selectWallet(wallet)
    props.navigation.navigate(props.wallets[wallet].primary ? 'HomeScreen' : 'OrgHome')
  }
  let walletNames = Object.keys(props.wallets)
  let wallets = walletNames.map((wallet, i) => {
    return walletNames[i] !== props.user.selectedWallet
      ? <MenuOption onSelect={() => walletSelectionHandler(walletNames[i])} key={i}>
        <Text style={{fontSize: 20, fontFamily: fonts.primaryText}}>{walletNames[i]}</Text>
      </MenuOption>
      : null
  })
  return (
    <View style={{flex: 1, backgroundColor: background4}}>
      <View style={{flexDirection: 'column'}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          backgroundColor: background1,
          height: calculateHeightRatio(54),
          alignItems: 'center'
        }}>
          <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, marginLeft: 18}} onPress={() => {
            props.navigation.toggleDrawer()
          }}>
            <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35), resizeMode: 'contain'}} source={require('circles-mobile/images/drawer.png')} />
          </TouchableHighlight>
          <Menu style={{marginRight: 18}}>
            <MenuTrigger>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, fontFamily: fonts.boldText, marginRight: 13}}>{props.user.selectedWallet}</Text>
                <Image style={{height: calculateHeightRatio(10), width: calculateWidthRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowDown.png')} />
              </View>

            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {marginTop: 30}}}>
              {wallets}
              <MenuOption onSelect={() => props.navigation.navigate('addOrgWallet.AddWallet')}>
                <Text style={{color: '#AAAAAA', fontSize: 14, fontFamily: fonts.primaryText}}>
                  ⨁ {translate('Add Org Wallet')}
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={{backgroundColor: background5, flexDirection: 'row', justifyContent: 'space-between', height: calculateHeightRatio(76), alignItems: 'center'}}>
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{color: 'white', fontSize: 26, fontFamily: fonts.boldText}}>
              {numberWithCommas(props.wallets[props.user.selectedWallet].balance)}
            </Text>
            <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: fonts.primaryText}}>
              Circles
            </Text>
          </View>
          <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginRight: 30, width: calculateWidthRatio(115), height: calculateHeightRatio(27), borderColor: primary, borderRadius: 5, borderWidth: 1}} onPress={() => {
            props.navigation.navigate('OrgWalletView')
          }}>
            <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: 'white'}}>{translate('View Wallet')}</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{flex: 0.08, alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{fontFamily: fonts.primaryText, fontSize: 14, color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginLeft: 21}}>{translate('SHORTCUTS')}</Text>
        <TouchableHighlight onPress={() => props.addItem({name: 'Item Name 2', price: 15})}>
          <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(22), marginLeft: 11, resizeMode: 'contain'}} source={require('circles-mobile/images/add.png')} />
        </TouchableHighlight>
      </View>
      <View style={{flex: 0.45}}>
        { typeof props.inventory.items !== 'undefined' && props.inventory.items.length
          ? (<View><Text style={{color: 'white'}}>{JSON.stringify(props.inventory.items)}</Text></View>)
          : (
            <View>
              <View style={{backgroundColor: background5, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'white', fontFamily: fonts.primaryText, fontSize: 12, marginLeft: 12}}>{translate('Trading in Person?')}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.boldText, fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
                 {translate('You have no inventory shortcuts!')}
                </Text>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
                  {translate('Tap to create a tag for things you exchange for Circles regularly.')}
                </Text>
                <TouchableHighlight onPress={() => props.navigation.navigate('OrgInventory')}>
                  <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(21), marginTop: 11, resizeMode: 'contain'}} source={require('circles-mobile/images/add.png')} />
                </TouchableHighlight>
              </View>
              <View style={{marginTop: 16, backgroundColor: background5, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'white', fontFamily: fonts.primaryText, fontSize: 12, marginLeft: 12}}>{translate('Trading online?')}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.boldText, fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
                  {translate('Add Your Circles Address Online')}
                </Text>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
                  {translate('Tap to copy your Circles address and add it to eBay, Etsy, Instagram, or anywhere online!')}
                </Text>
              </View>
            </View>)
        }
      </View>
    </View>
  )
}

OrgHomeScreen.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OrgHomeScreen
