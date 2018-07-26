import React from 'react'
import { Keyboard, Image, Text, TouchableHighlight, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, secondary, textColorMain, lightBackground, height, darkBackground, mediumLightBackground } from 'circles-mobile/lib/styles/styles'


class ValidateSuccess extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: darkBackground}}>
        <View style={{
          height: calculateHeightRatio(66),
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: mediumLightBackground,
          shadowOffset: {width: 0, height: 4},
          shadowColor: 'rgba(7, 7, 7, 0.5)',
          shadowOpacity: 0.2
        }}>
          <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10}} onPress={() => {
            this.props.navigation.navigate('WalletView')
          }}>
            <View style={{flexDirection: 'row', marginLeft: 26, alignItems: 'center'}}>
              <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18)}} source={require('circles-mobile/images/arrowLeft.png')} />
              <Text style={{fontFamily: 'now-alt-regular', color: 'white', marginLeft: 16}}>{`Back`}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', marginTop: calculateHeightRatio(83)}}>
          <Image style={{height: 170, width: 202, marginTop: calculateHeightRatio(26), marginLeft: calculateWidthRatio(25)}} source={require('circles-mobile/images/successCheck.png')} />
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 30, color: 'white', marginTop: calculateHeightRatio(114)}}>Success!</Text>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: 'white', marginTop: calculateHeightRatio(5)}}>You have validated your identity with the Circles Team</Text>
          <TouchableHighlight style={{flex: 1, marginTop: calculateHeightRatio(65)}} onPress={() => this.props.navigation.navigate('WalletView')}>
            <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
              <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontFamily: 'now-alt-regular'}}>
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
