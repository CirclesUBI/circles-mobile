import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { width } from 'circles-mobile/lib/styles/styles'

class CameraAuthDenied extends React.Component {
  render () {
    return (
      <View style={{flex: 1, width: width, backgroundColor: 'black'}}>
        <View style={{flex: 7, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Text />
          </View>
          <View style={{flex: 2}}>
            <Text style={{color: 'white', margin: 20, textAlign: 'center'}}>Camera Disabled</Text>
            <Text style={{color: 'white', margin: 20, textAlign: 'center'}}>To scan QR codes, go to your phone's settings to allow camera access</Text>
            <TouchableOpacity style={{padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => { this.props.navigator.pop({animated: true, animationType: 'slide-horizontal'}) }} >
              <Text style={{color: '#fff', fontSize: 18}}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

export default CameraAuthDenied
