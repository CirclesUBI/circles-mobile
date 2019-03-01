import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { background3, fonts, textColor1, secondary } from 'circles-mobile/lib/styles'

const NavBar = (props) => <View
  style={{
    height: calculateHeightRatio(66),
    justifyContent: props.title ? 'space-between' : 'flex-start',
    alignItems: 'center',
    backgroundColor: secondary,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'rgba(7, 7, 7, 0.5)',
    shadowOpacity: 0.2,
    flexDirection: 'row',
    marginTop: 15
  }}>
  {props.noBack
    ? <View style={{height: 20, minWidth: calculateWidthRatio(56)}} />
    : <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, minWidth: calculateWidthRatio(56)}} onPress={props.navFunction}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowLeft.png')} />
        {/* <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 10}}>{`Back`}</Text> */}
      </View>
    </TouchableHighlight>
  }
  {props.title
    ? props.title
    : null
  }
  {props.noClose
    ? <View style={{height: 20, minWidth: calculateWidthRatio(56)}} />
    : <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, minWidth: calculateWidthRatio(56)}} onPress={props.closeFunction}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: calculateWidthRatio(15), height: calculateHeightRatio(15), resizeMode: 'contain'}} source={require('circles-mobile/images/x.png')} />
      </View>
    </TouchableHighlight>
  }
</View>

export default NavBar
// ? <Text style={{fontFamily: fonts.boldText, color: textColor1, marginTop: 10, fontSize: 16}}>
//   {props.title}
// </Text>
