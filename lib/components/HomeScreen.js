import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import { Card } from 'antd-mobile-rn'
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
            <ScrollView horizontal>
              <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
                <Card.Header
                  title='This is title'
                  thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
                  // extra={<span>this is extra</span>}
                />
                <Card.Body>
                  <Text>
                    Omg this is amazing
                  </Text>
                </Card.Body>
                <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
              </Card>
              {/* <View style={{flex: 1, width: Dimensions.get('window').width, backgroundColor: 'green'}}>
                <Text>Hello</Text>
              </View> */}
              <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
                <Card.Header
                  title='This is title'
                  thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
                  // extra={<span>this is extra</span>}
                />
                <Card.Body>
                  <Text>
                    Omg this is amazing
                  </Text>
                </Card.Body>
                <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
              </Card>
            </ScrollView>
          </View>
          <View style={{height: 300, backgroundColor: 'black'}}>
            <ScrollView horizontal>
              <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
                <Card.Header
                  title='This is title'
                  thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
                  // extra={<span>this is extra</span>}
                />
                <Card.Body>
                  <Text>
                    Omg this is amazing
                  </Text>
                </Card.Body>
                <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
              </Card>
              <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
                <Card.Header
                  title='This is title'
                  thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
                  // extra={<span>this is extra</span>}
                />
                <Card.Body>
                  <Text>
                    Omg this is amazing
                  </Text>
                </Card.Body>
                <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
              </Card>
            </ScrollView>
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
