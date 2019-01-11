import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

const styles = StyleSheet.create({
  general: {
    fontFamily: fonts.titleText,
    color: 'white',
    textAlign: 'center'
  },
  general2: {
    fontFamily: fonts.primaryText,
    color: 'white',
    textAlign: 'center'
  }
})

export default (props) => (
  <View
    style={{
      width: width,
      height: height - 200,
      alignItems: 'center',
      marginTop: 20
    }}
  >
    <Text
      style={[
        {
          fontSize: 24,
          width: calculateWidthRatio(115),
          marginTop: 10
        },
        styles.general
      ]}
    >
      Welcome to
    </Text>
    <Text
      style={[
        {
          fontSize: 60
        },
        styles.general
      ]}
    >
      Circles
    </Text>
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Circles is a universal basic income based on a network of
      trust.
    </Text>
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Invite friends you know and trust into the Circles system in
      order to exchange money with them!
    </Text>
    {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
  </View>
)
