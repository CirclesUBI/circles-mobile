import React from 'react'
import {
  Image,
  View
} from 'react-native'

import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

export default (props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: calculateHeightRatio(66)
    }}
  >
    <Image
      style={{
        width: calculateWidthRatio(190),
        height: calculateHeightRatio(192),
        resizeMode: 'contain'
      }}
      source={require('circles-mobile/images/logo.png')}
    />
  </View>
)
