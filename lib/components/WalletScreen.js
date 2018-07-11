import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

class WalletScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'space-between', alignItems: 'stretch'}}>
        <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, width: 30, marginTop: 30}} onPress={() => {
          // Navigation.dismissModal({
          //   navigatorStyle: {
          //     navBarHidden: true
          //   }
          // })
          this.props.navigation.goBack()
        }}>
          <Text>X</Text>
        </TouchableHighlight>
        <View>
          <Text>Wallet Screen</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 500, height: 60}}>
          <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, width: 30, marginTop: 30}} onPress={() => {
            Navigation.dismissModal({
              navigatorStyle: {
                navBarHidden: true
              }
            })
          }}>
            <Text>Add Contacts</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, width: 30, marginTop: 30}} onPress={() => {
            Navigation.showModal({
              navigatorStyle: {
                navBarHidden: true
              },
              screen: 'ValidateScreen', // unique ID registered with Navigation.registerScreen
              animationType: 'none'
            })
          }}>
            <Text>Get Validated</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }
}

export default WalletScreen
