import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { darkBackground } from 'circles-mobile/lib/styles/styles'

class RequestQR extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: darkBackground}}>
        <NavBar navFunction={() => this.props.navigation.goBack()} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontFamily: 'now-alt-bold', fontSize: 20, color: 'white', marginTop: calculateHeightRatio(50)}}>Ashoka Finley</Text>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, color: '#5D5D6A', marginTop: calculateHeightRatio(10)}}>Requests</Text>
            <Text style={{color: '#FFFFFF', fontSize: 60, fontFamily: 'ostrich-sans-heavy', textAlign: 'center', marginTop: calculateHeightRatio(40)}}>50 CCS</Text>
            <Image style={{width: calculateWidthRatio(176), height: calculateHeightRatio(173), marginTop: calculateHeightRatio(20)}} source={require('circles-mobile/images/qr_code.png')} />
            <Text style={{marginTop: calculateHeightRatio(36), fontFamily: 'now-alt-regular', color: '#5D5D6A', fontSize: 14, width: calculateWidthRatio(251), textAlign: 'center'}}>
              Ask them to open their app to scan this QR code, then you're done!
            </Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RequestContacts')}>
              <View>
                <Text style={{marginTop: calculateHeightRatio(20), fontFamily: 'now-alt-bold', color: '#90E23C', fontSize: 14}}>
                  You can also request from your Circles contacts >
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export default RequestQR
