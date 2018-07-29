import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { mediumLightBackground } from 'circles-mobile/lib/styles/styles'

const NavBar = (props) => <View
  style={{
    height: calculateHeightRatio(66),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: mediumLightBackground,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(7, 7, 7, 0.5)',
    shadowOpacity: 0.2
  }}>
  <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10}} onPress={props.navFunction}>
    <View style={{flexDirection: 'row', marginLeft: 26, alignItems: 'center'}}>
      <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18)}} source={require('circles-mobile/images/arrowLeft.png')} />
      <Text style={{fontFamily: 'now-alt-regular', color: 'white', marginLeft: 16}}>{`Back`}</Text>
    </View>
  </TouchableHighlight>
</View>

export default NavBar
