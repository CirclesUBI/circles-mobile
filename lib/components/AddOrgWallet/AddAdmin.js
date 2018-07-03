import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

class AddAdmin extends React.Component {
  render () {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
            Navigation.dismissModal({
              animationType: 'none'
            })
          }}>
            <Text>{`< Back`}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
            Navigation.dismissAllModals({
              animationType: 'none'
            })
          }}>
            <Text>X</Text>
          </TouchableHighlight>
        </View>
        <Text>Add Admin</Text>
        <View>
          <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
            Navigation.showModal({
              screen: 'addOrgWallet.AddSigner',
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

export default AddAdmin
