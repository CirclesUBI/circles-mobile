import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { width } from 'circles-mobile/lib/styles'

class CameraAuthDenied extends React.Component  {
  constructor (props, {t: translate}) {
    super(props)
    this.translate = translate
  }

  render () {
    return (
      <View style={{flex: 1, width: width, backgroundColor: 'black'}}>
        <View style={{flex: 7, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Text />
          </View>
          <View style={{flex: 2}}>
            <Text style={{color: 'white', margin: 20, textAlign: 'center'}}>{this.translate('Camera Disabled')}</Text>
            <Text style={{color: 'white', margin: 20, textAlign: 'center'}}>{this.translate("To scan QR codes, go to your phone's settings to allow camera access")}</Text>
            <TouchableOpacity style={{padding: 10, justifyContent: 'center', alignItems: 'center'}} onPress={() => { this.props.navigator.pop({animated: true, animationType: 'slide-horizontal'}) }} >
              <Text style={{color: '#fff', fontSize: 18}}>{this.translate('Back')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

CameraAuthDenied.contextTypes = {
  t: PropTypes.func.isRequired
}

export default CameraAuthDenied
