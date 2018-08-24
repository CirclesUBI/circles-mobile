import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, fonts } from 'circles-mobile/lib/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

class ValidateSuccess extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: background5}}>
        <NavBar navFunction={() => this.props.navigation.navigate('WalletView')} />
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', marginTop: calculateHeightRatio(83)}}>
          <Image style={{height: 170, width: 202, marginTop: calculateHeightRatio(26), marginLeft: calculateWidthRatio(25), resizeMode: 'contain'}} source={require('circles-mobile/images/successCheck.png')} />
          <Text style={{fontFamily: fonts.primaryText, fontSize: 30, color: 'white', marginTop: calculateHeightRatio(114)}}>Success!</Text>
          <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: 'white', marginTop: calculateHeightRatio(5)}}>You have validated your identity with the Circles Team</Text>
          <TouchableHighlight style={{flex: 1, marginTop: calculateHeightRatio(65)}} onPress={() => this.props.navigation.navigate('WalletView')}>
            <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
              <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontFamily: fonts.primaryText}}>
                RETURN TO YOUR WALLET
              </Text>
            </View>
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}

export default ValidateSuccess
