import React from 'react'
import { Text, View, Platform, TouchableOpacity } from 'react-native'
import { width } from 'circles-mobile/lib/styles/styles'
import { Camera, Permissions } from 'expo'
import CameraAuthDenied from './CameraAuthDenied'

const DisabledScanner = (props) => <View style={{backgroundColor: 'black', flex: 1}} />

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
      hasCameraPermission: null,
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
          <Camera style={{ flex: 1 }} type={this.state.type} pictureSize='help'>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}>
              {/* <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  })
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity> */}
            </View>
          </Camera>
        </View>
      )
    }
  }
}
