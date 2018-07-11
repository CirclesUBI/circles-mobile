import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const OrgAddInventory = (props) => (
  <View>
    <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
      props.navigation.navigate('OrgWalletView')
    }}>
      <Text>{`< Back`}</Text>
    </TouchableHighlight>
    <Text>OrgInventory</Text>
  </View>
)

export default OrgAddInventory
