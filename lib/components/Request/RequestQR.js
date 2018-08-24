import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { background5, fonts } from 'circles-mobile/lib/styles'

class RequestQR extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: background5}}>
        <NavBar navFunction={() => this.props.navigation.goBack()} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontFamily: fonts.boldText, fontSize: 20, color: 'white', marginTop: calculateHeightRatio(50)}}>{this.props.navigation.state.params.wallet}</Text>
            <Text style={{fontFamily: fonts.primaryText, fontSize: 20, color: '#5D5D6A', marginTop: calculateHeightRatio(10)}}>Requests</Text>
            <Text style={{color: '#FFFFFF', fontSize: 60, fontFamily: fonts.titleText, textAlign: 'center', marginTop: calculateHeightRatio(40)}}>{`${this.props.navigation.state.params.amount} CCS`}</Text>
            <Image style={{width: calculateWidthRatio(176), height: calculateHeightRatio(173), marginTop: calculateHeightRatio(20), resizeMode: 'contain'}} source={require('circles-mobile/images/qr_code.png')} />
            <Text style={{marginTop: calculateHeightRatio(36), fontFamily: fonts.primaryText, color: '#5D5D6A', fontSize: 14, width: calculateWidthRatio(251), textAlign: 'center'}}>
              Ask them to open their app to scan this QR code, then you're done!
            </Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RequestContacts', {screen: 'RequestConfirm', wallet: this.props.navigation.state.params.wallet, amount: this.props.navigation.state.params.amount})}>
              <View>
                <Text style={{marginTop: calculateHeightRatio(20), fontFamily: fonts.boldText, color: '#90E23C', fontSize: 14}}>
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
