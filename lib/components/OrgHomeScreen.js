import React from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground, mediumBackground, lightBackground } from 'circles-mobile/lib/styles/styles'
import { numberWithCommas } from 'circles-mobile/lib/utilities'

export default (props) => {
  let walletSelectionHandler = (wallet) => {
    props.selectWallet(wallet)
    props.navigation.navigate('OrgHome')
  }
  let walletNames = Object.keys(props.wallets)
  let wallets = walletNames.map((wallet, i) => {
    return walletNames[i] !== props.user.selectedOrgWallet
    ? <MenuOption onSelect={() => walletSelectionHandler(walletNames[i])} key={i}>
      <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>{walletNames[i]}</Text>
    </MenuOption>
    : null
  })
  return (
    <View style={{flex: 1, backgroundColor: mediumBackground}}>
      <View style={{flexDirection: 'column'}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          backgroundColor: lightBackground,
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
                <Text style={{color: 'white', fontSize: 20, fontFamily: 'now-alt-bold', marginRight: 13}}>{props.user.selectedOrgWallet}</Text>
                <Image style={{height: calculateHeightRatio(10), width: calculateWidthRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowDown.png')} />
              </View>

            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {marginTop: 30}}}>
              <MenuOption onSelect={() => props.navigation.navigate('HomeScreen')}>
                <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>{props.user.name}</Text>
              </MenuOption>
              {wallets}
              <MenuOption onSelect={() => props.navigation.navigate('addOrgWallet.AddWallet')}>
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
              {numberWithCommas(props.wallets[props.user.selectedOrgWallet].balance)}
            </Text>
            <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: 'now-alt-regular'}}>
              Circles
            </Text>
          </View>
          <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginRight: 30, width: calculateWidthRatio(115), height: calculateHeightRatio(27), borderColor: primary, borderRadius: 5, borderWidth: 1}} onPress={() => {
            props.navigation.navigate('OrgWalletView')
          }}>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: 'white'}}>View Wallet</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={{flex: 0.08, alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{fontFamily: 'now-alt-regular', fontSize: 14, color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginLeft: 21}}>SHORTCUTS</Text>
        <TouchableHighlight onPress={() => props.addItem({name: 'Item Name 2', price: 15})}>
          <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(22), marginLeft: 11, resizeMode: 'contain'}} source={require('circles-mobile/images/add.png')} />
        </TouchableHighlight>
      </View>
      <View style={{flex: 0.45}}>
        { typeof props.inventory.items !== 'undefined' && props.inventory.items.length
          ? (<View><Text style={{color: 'white'}}>{JSON.stringify(props.inventory.items)}</Text></View>)
          : (
            <View>
              <View style={{backgroundColor: darkBackground, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'white', fontFamily: 'now-alt-regular', fontSize: 12, marginLeft: 12}}>Trading in Person?</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'now-alt-bold', fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
                  You have no inventory shortcuts!
                </Text>
                <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
                  Tap to create a tag for things you exchange for Circles regularly.
                </Text>
                <TouchableHighlight onPress={() => props.navigation.navigate('OrgInventory')}>
                  <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(21), marginTop: 11, resizeMode: 'contain'}} source={require('circles-mobile/images/add.png')} />
                </TouchableHighlight>
              </View>
              <View style={{marginTop: 16, backgroundColor: darkBackground, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'white', fontFamily: 'now-alt-regular', fontSize: 12, marginLeft: 12}}>Trading online?</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: 'now-alt-bold', fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
                  Add Your Circles Address Online
                </Text>
                <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
                  Tap to copy your Circles address and add it to eBay, Etsy, Instagram, or anywhere online!
                </Text>
              </View>
            </View>)
          }
      </View>
    </View>
  )
}
