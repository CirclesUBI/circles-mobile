import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
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
      <Card style={{flex: 1}}>
        <Card.Header
          title={item.title}
          thumb={item.thumb}
          // extra={<span>this is extra</span>}
        />
        <Card.Body>
          <Text>
            {item.body}
          </Text>
        </Card.Body>
        {/* <Card.Footer content='footer content' extra={<Text>Hello</Text>} /> */}
      </Card>
    )
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'red', flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginTop: 20}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='menu' size={24} color='white' />
            </TouchableHighlight>
            <Menu>
              <MenuTrigger text={'Ashoka Finley ▼'} />
              <MenuOptions>
                <MenuOption text='Ashoka Finley' />
                <MenuOption onSelect={() => this.props.navigation.navigate('OrgWalletView')} text={'Knitting Socks'} />
                <MenuOption onSelect={() => this.props.navigation.navigate('addOrgWallet.AddWallet')} text={'⨁ Add Org Wallet'} />
              </MenuOptions>
            </Menu>
          </View>
          <View style={{backgroundColor: 'teal', flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <View style={{flexDirection: 'column'}}>
              <Text>
                10,000
              </Text>
              <Text>
                Circles
              </Text>
            </View>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}} onPress={() => {
              this.props.navigation.navigate('WalletView')
              // Navigation.showModal({
              //   screen: 'WalletScreen',
              //   navigatorStyle: {
              //     navBarHidden: true
              //   }
              // })
            }}>
              <Text>View Wallet</Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <View style={{height: 300, backgroundColor: 'blue'}}>
            <Carousel
              ref={(c) => { this._carousel1 = c }}
              data={[{
                title: 'This is title',
                thumb: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
                body: 'Omg this is amazing'
              }, {
                title: 'This is title',
                thumb: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
                body: 'Omg this is amazing'
              }]}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 10}
            />
          </View>
          <View style={{height: 300, backgroundColor: 'black'}}>
            <Carousel
              ref={(c) => { this._carousel2 = c }}
              data={[{
                title: 'This is title',
                thumb: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
                body: 'Omg this is amazing'
              }, {
                title: 'This is title',
                thumb: 'https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg',
                body: 'Omg this is amazing'
              }]}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 10}
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
