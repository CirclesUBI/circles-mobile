import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { fonts } from 'circles-mobile/lib/styles'
import { Camera, Permissions } from 'expo'
// import CameraAuthDenied from './CameraAuthDenied'

// const DisabledScanner = (props) => <View style={{backgroundColor: 'black', flex: 1}} />

// export class Scanner extends React.Component {
//   constructor (props) {
//     super()
//     this.onBarCodeRead = this.onBarCodeRead.bind(this)
//     // this.handleAppStateChange = this.handleAppStateChange.bind(this)
//     this.state = {
//       currentAppState: 'active'
//     }
//   }
//
//   componentDidMount () {
//     Permissions.check('camera').then(response => {
//       this.props.authorizeCamera(response)
//       if (response === 'undetermined') {
//         Permissions.request('camera').then(response => {
//           this.props.authorizeCamera(response)
//         })
//       }
//     })
//   }
//
//   componentWillReceiveProps (nextProps) {
//     if (!this.props.enabled && nextProps.enabled) {
//       this.hasBarcode = false
//       this.setState({scan: true})
//     } else if (!nextProps.enabled) {
//       this.hasBarcode = true
//       this.setState({scan: false})
//     } else {
//       this.hasBarcode = false
//       this.setState({scan: true})
//     }
//   }
//
//   onBarCodeRead (event) {
//     if (this.hasBarcode) return
//     this.hasBarcode = true
//     this.props.navigator.pop({
//       animated: true,
//       animationType: 'slide-horizontal'
//     })
//     this.props.scanURL(event)
//     this.setState({scan: false})
//   }
//
//   render () {
//     if (this.props.scanError) {
//       return (<View style={{flex: 1, width: width}}><DisabledScanner /></View>)
//     }
//     if (this.props.authorization.cameraAuthorized === 'denied' || this.props.authorization.cameraAuthorized === 'restricted') {
//       return (<CameraAuthDenied navigator={this.props.navigator} />)
//     } else if (this.props.authorization.cameraAuthorized === 'undetermined') {
//       return (<View style={{flex: 1, width: width}}><DisabledScanner /></View>)
//     } else if (Platform.OS === 'android' && this.state && !this.state.scan) {
//       return (<View style={{flex: 1, width: width}}><DisabledScanner /></View>)
//     } else if (this.state.currentAppState === 'inactive' || this.state.currentAppState === 'background') {
//       return (
//         <View style={{flex: 1, width: width}}>
//           <DisabledScanner />
//         </View>
//       )
//     } else {
//       return (
//         <Camera
//           captureAudio={false}
//           style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
//           onBarCodeRead={this.onBarCodeRead.bind(this)}
//           aspect={Camera.constants.Aspect.fill}>
//           <TouchableOpacity style={{marginBottom: 30, padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)'}} onPress={() => { this.props.navigator.pop({animated: true, animationType: 'slide-horizontal'}) }} >
//             <Text style={{color: '#fff', fontSize: 22}}>Cancel</Text>
//           </TouchableOpacity>
//         </Camera>
//       )
//     }
//   }
// }
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
                }}>
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
