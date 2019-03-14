import React from 'react'
import {
  TouchableHighlight,
  Text
} from 'react-native'
import {
  fonts
} from 'circles-mobile/lib/styles'

export default ({
  navigation,
  destination
}) => {
  return (
    <TouchableHighlight onPress={() => navigation.push(destination)}>
      <Text style={{
        color: 'white',
        fontSize: 16,
        fontFamily: fonts.primaryText,
        alignSelf: 'center',
        marginTop: 18
      }}>Skip ></Text>
    </TouchableHighlight>
  )
}
