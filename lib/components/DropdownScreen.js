import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

class DropdownScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <View style={{height: 100, width: 200, backgroundColor: 'white'}}>
          <Text>Hi</Text>
        </View>
        {/* <TouchableHighlight style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
          Navigation.toggleDrawer({
            side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
            animated: true // does the toggle have transition animation or does it happen immediately (optional)
          })
        }}>
          <Text>Drawer</Text>
        </TouchableHighlight> */}
      </View>
    )
  }
}

export default DropdownScreen
