import React from 'react'
import { View } from 'react-native'
import {
  primary,
  width
} from 'circles-mobile/lib/styles'

export default (props) => (
  <View style={{
    width: width * 0.6,
    backgroundColor: 'white',
    height: 3,
    diplay: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }}>
    <View style={{
      width: props.amount,
      backgroundColor: primary,
      height: 3
    }} />
  </View>
)
