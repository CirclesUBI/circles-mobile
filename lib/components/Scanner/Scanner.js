import React from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { fonts } from 'circles-mobile/lib/styles'
import { Camera, Permissions } from 'expo'

export default class Scanner extends React.Component {
  constructor () {
    super()
    this.state = {
      hasCameraPermission: true,
      type: Camera.Constants.Type.back
    }
  }

  async componentWillMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render () {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
            pictureSize={'600'}
            onBarCodeRead={(obj) => { if (obj.type === 'org.iso.QRCode') { Alert.alert(`${obj.data}`) } }}
          >
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 30,
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.props.navigation.navigate('Tabs')
                }}
              >
                <View style={{flexDirection: 'row', marginLeft: 26, alignItems: 'center'}}>
                  <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18), resizeMode: 'contain'}} source={require('circles-mobile/images/arrowLeft.png')} />
                  <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 16}}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Image style={{marginTop: calculateHeightRatio(140), width: calculateWidthRatio(283), height: calculateHeightRatio(275), resizeMode: 'contain', alignSelf: 'center'}} source={require('circles-mobile/images/reticle.png')} />
          </Camera>
        </View>
      )
    }
  }
}
