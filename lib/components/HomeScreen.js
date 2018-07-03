import React from 'react'
import { Text, View, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'

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
        <View style={{height: 100, backgroundColor: 'red'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30}} onPress={() => {
              this.props.navigation.toggleDrawer()
            }}>
              <Text>Drawer</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30}} onPress={() => {
              this.props.navigation.navigate('addOrgWallet.AddWallet')
              // Navigation.showModal({
              //   screen: "addOrgWallet.AddWallet", // unique ID registered with Navigation.registerScreen
              //   navigatorStyle: {
              //     navBarHidden: true
              //   },
              //   animationType: 'none',
              //   passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
              //   // style: {
              //   //   backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
              //   //   backgroundColor: "#60606080", // tint color for the background, you can specify alpha here (optional)
              //   //   tapBackgroundToDismiss: true  // does the toggle have transition animation or does it happen immediately (optional)
              //   // }
              // })
            }}>
              <Text>Wallet Name</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
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
        <ScrollView>
          <View style={{height: 300, backgroundColor: 'blue'}}>
            <ScrollView horizontal>
              <View style={{flex: 1, width: Dimensions.get('window').width, backgroundColor: 'green'}}>
                <Text>Hello</Text>
              </View>
              <View style={{flex: 1, width: Dimensions.get('window').width, backgroundColor: 'teal'}}>
                <Text>There</Text>
              </View>
            </ScrollView>
          </View>
          <View style={{height: 300, backgroundColor: 'black'}}>
            <ScrollView horizontal>
              <View style={{flex: 1, width: Dimensions.get('window').width, backgroundColor: 'green'}}>
                <Text>Hello</Text>
              </View>
              <View style={{flex: 1, width: Dimensions.get('window').width, backgroundColor: 'teal'}}>
                <Text>There</Text>
              </View>
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
