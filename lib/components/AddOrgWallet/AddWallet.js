import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

class AddWallet extends React.Component {
  render () {
    return (
      <View>
        <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
          this.props.navigation.goBack()
          // Navigation.dismissAllModals({
          //   animationType: 'none'
          // })
        }}>
          <Text>X</Text>
        </TouchableHighlight>
        <Text>Add Wallet</Text>
        <View>
          <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
            Navigation.showModal({
              screen: 'addOrgWallet.AddOffer',
              navigatorStyle: {
                navBarHidden: true
              },
              animationType: 'none'
            })
          }}>
            <Text>{`Next >`}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default AddWallet
