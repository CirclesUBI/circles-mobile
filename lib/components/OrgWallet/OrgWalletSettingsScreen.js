import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const OrgWalletSettings = (props) => (
  <View>
    <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
      props.navigation.goBack()
    }}>
      <Text>{`< Back`}</Text>
    </TouchableHighlight>
    <Text>Pay</Text>
  </View>
)

export default OrgWalletSettings
