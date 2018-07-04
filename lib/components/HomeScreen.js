import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'
import { Card } from 'antd-mobile-rn'

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
          <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <Text>Drawer</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30}} onPress={() => {
              this.props.navigation.navigate('addOrgWallet.AddWallet')
              // Navigation.showModal({
              //   screen: 'addOrgWallet.AddWallet', // unique ID registered with Navigation.registerScreen
              //   navigatorStyle: {
              //     navBarHidden: true
              //   },
              //   animationType: 'none',
              //   passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
              //   // style: {
              //   //   backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
              //   //   backgroundColor: '#60606080', // tint color for the background, you can specify alpha here (optional)
              //   //   tapBackgroundToDismiss: true  // does the toggle have transition animation or does it happen immediately (optional)
              //   // }
              // })
            }}>
              <Text>Ashoka Finley</Text>
            </TouchableHighlight>

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
