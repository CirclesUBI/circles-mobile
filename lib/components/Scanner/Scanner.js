import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Text, View, Image, StyleSheet } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { fonts } from 'circles-mobile/lib/styles'
import { BarCodeScanner, Camera, Permissions } from 'expo'

class Scanner extends React.Component  {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      hasCameraPermission: true,
      type: Camera.Constants.Type.back,
      barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
    }
  }

  async componentWillMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  handleBarCodeScanned ({ type, data }) {
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  render () {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>{translate('No access to camera')}</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Image style={{marginTop: calculateHeightRatio(140), width: calculateWidthRatio(283), height: calculateHeightRatio(275), resizeMode: 'contain', alignSelf: 'center'}} source={require('circles-mobile/images/reticle.png')} />          
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, {'zIndex': -1}]}
            type={this.type}
            barCodeTypes={this.barCodeTypes}
          />
        </View>
      )
    }
  }
}

Scanner.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Scanner