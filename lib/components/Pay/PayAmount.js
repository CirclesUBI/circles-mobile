import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
const PayAmount = (props) => (
  <View>
    <NavBar navFunction={() => props.navigation.navigate('Home')} />
    <Text>Pay</Text>
  </View>
)

export default PayAmount
