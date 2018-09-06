import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { background3, fonts } from 'circles-mobile/lib/styles'

const NavBar = (props) => <View
  style={{
    height: calculateHeightRatio(66),
    justifyContent: props.title ? 'space-between' : 'flex-start',
    alignItems: 'center',
    backgroundColor: background3,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(7, 7, 7, 0.5)',
    shadowOpacity: 0.2,
    flexDirection: 'row'
  }}>
  {props.noBack
    ? <View style={{height: 20, minWidth: calculateWidthRatio(56)}} />
    : <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10, minWidth: calculateWidthRatio(56)}} onPress={props.navFunction}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 15}}>
        <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowLeft.png')} />
        <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 10}}>{`Back`}</Text>
      </View>
    </TouchableHighlight>
  }
  {props.title
    ? <Text style={{fontFamily: fonts.boldText, color: 'white', marginTop: 10, fontSize: 16}}>
      {props.title}
    </Text>
    : null}
  <View style={{height: 20, minWidth: calculateWidthRatio(56)}} />
</View>

export default NavBar
