import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const PayAmount = (props) => (
  <View>
    <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
      props.navigation.navigate('Home')
    }}>
      <Text>{`< Back`}</Text>
    </TouchableHighlight>
    <Text>Pay</Text>
  </View>
)

export default PayAmount
