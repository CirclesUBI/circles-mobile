import React from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground, mediumBackground, mediumDarkBackground, lightBackground } from 'circles-mobile/lib/styles/styles'
import DrawerComponent from 'circles-mobile/lib/components/Drawer'

class OrgHomeScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: mediumBackground}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: lightBackground, height: calculateHeightRatio(54), alignItems: 'center'}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, marginLeft: 18}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35), resizeMode: 'contain'}} source={require('circles-mobile/images/drawer.png')} />
              {/* <SimpleLineIcons style={{alignSelf: 'center'}} name='menu' size={24} color='white' /> */}
            </TouchableHighlight>
            <Menu style={{marginRight: 18}}>
              <MenuTrigger>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: 'white', fontSize: 20, fontFamily: 'now-alt-bold', marginRight: 13}}>Knitted Socks Org</Text>
                  <Image style={{height: calculateHeightRatio(10), width: calculateWidthRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowDown.png')} />
                </View>

              </MenuTrigger>
              <MenuOptions customStyles={{optionsContainer: {marginTop: 30}}}>
                {/* <MenuOption>
                  <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>Ashoka Finley</Text>
                </MenuOption> */}
                <MenuOption onSelect={() => this.props.navigation.navigate('HomeScreen')}>
                  <Text style={{fontSize: 20, fontFamily: 'now-alt-regular'}}>Ashoka Finley</Text>
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
                20,000.00
              </Text>
              <Text style={{color: '#9D9D9D', fontSize: 14, fontFamily: 'now-alt-regular'}}>
                Circles
              </Text>
            </View>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginRight: 30, width: calculateWidthRatio(115), height: calculateHeightRatio(27), borderColor: primary, borderRadius: 5, borderWidth: 1}} onPress={() => {
              this.props.navigation.navigate('OrgWalletView')
            }}>
              <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: 'white'}}>View Wallet</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flex: 0.08, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 14, color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginLeft: 21}}>SHORTCUTS</Text>
          <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(22), marginLeft: 11, resizeMode: 'contain'}} source={require('circles-mobile/images/add.png')} />
        </View>
        <View style={{flex: 0.45}}>
          {/* {
            this.state.controlIndex
            ? <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
                <Image style={{width: calculateWidthRatio(37), height: calculateHeightRatio(37)}} source={require('circles-mobile/images/circlesDistribution.png')} />
                <Text style={{marginLeft: 16, fontSize: 16, fontFamily: 'now-alt-bold', color: 'white'}}>You received 1000 CCS</Text>
              </View>
              <Text style={{fontSize: 12, fontFamily: 'now-alt-regular', color: 'white', marginTop: 30}}>You have been issued your first Circles basic income!</Text>
            </View>
            : <FlatList
              data={[{key: 'a', value: 1000}, {key: 'b', value: 500}]}
              renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: calculateHeightRatio(52), borderBottomWidth: 1, borderColor: 'rgba(58, 59, 78, 49)'}}>
                <Image style={{width: calculateWidthRatio(26), height: calculateHeightRatio(26), marginLeft: 27}} source={require('circles-mobile/images/circlesDistribution.png')} />
                <Text style={{marginLeft: 19, fontSize: 12, fontFamily: 'now-alt-regular', color: '#CECECE'}}>{`You received ${item.value} CCS`}</Text>
              </View>}
            />
          } */}
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
            <TouchableHighlight onPress={() => this.props.navigation.navigate('OrgInventory')}>
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
        </View>
        {/* <ScrollView>
          <View style={{height: calculateHeightRatio(272)}}>
            <View style={{height: calculateHeightRatio(71), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 23, marginRight: 23}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height: calculateHeightRatio(31.4), resizeMode: 'contain'}} source={require('circles-mobile/images/Marker.png')} />
                <Text style={styles.sectionHeading}>Nearby</Text>
              </View>
              <Image style={{width: calculateWidthRatio(20), height: calculateHeightRatio(20), resizeMode: 'contain'}} source={require('circles-mobile/images/map.png')} />
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
          <View style={{height: calculateHeightRatio(272), marginTop: 10, marginBottom: 20}}>
            <View style={{height: calculateHeightRatio(71), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 23, marginRight: 23}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{height: calculateHeightRatio(31.4), resizeMode: 'contain'}} source={require('circles-mobile/images/recent.png')} />
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
        </ScrollView> */}
      </View>
    )
  }
}

const OrgHomeNavigator = createDrawerNavigator({
  Home: {
    screen: OrgHomeScreen
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

export default OrgHomeNavigator
