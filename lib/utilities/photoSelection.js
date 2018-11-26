import {
  Alert,
  Linking,
  Platform,
  PermissionsAndroid
} from 'react-native'
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-picker'
import {
  authorizeCamera,
  authorizePhotos
} from 'circles-mobile/lib/actions/authorizationActions'

const photoSelection = ({cameraStatus, photoStatus, segmentId, addFn}) => {
  const photoOptions = {
    title: 'Add Picture',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose from Library',
    quality: 0.5,
    maxWidth: 300,
    maxHeight: 300,
    allowsEditing: true,
    storageOptions: {
      skipBackup: true
    }
  }
  const ImagePickerHandler = () => {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        addFn({avatar: response})
        // this.props.authorizeCameraAndPhotos(cameraPermission, photoPermission)
      }
    })
  }
  const androidPermissionsRequest = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
      let photoPermission = response
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(response => {
        let cameraPermission = response
        if (photoPermission && cameraPermission) {
          ImagePickerHandler()
        }
      })
    })
  }
  const iosPermissionsRequest = () => {
    Permissions.request('camera').then(response => {
      let cameraPermission = response
      Permissions.request('photo').then(response => {
        let photoPermission = response
        if (photoPermission === 'authorized' && cameraPermission === 'authorized') {
          ImagePickerHandler()
        }
      })
    })
  }
  const deniedHandler = () => {
    if (cameraStatus === 'denied' || photoStatus === 'denied') {
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Camera and Photo Access Required',
          'Please authorize uport to access cameras and photos',
          [
            {text: 'Go to Settings', onPress: () => Linking.openURL('app-settings:')},
            {text: 'Cancel', onPress: () => true // console.log('ONBOARDING: Cancel Permissions')
            }
          ]
        )
      } else {
        Alert.alert(
          'Camera and Photo Access Required',
          'Please authorize uport to access cameras and photos',
          [
            {text: 'OK', onPress: () => true // console.log('ONBOARDING: Cancel Permissions')
            }
          ]
        )
      }
    }
  }
  Platform.OS === 'android' ? androidPermissionsRequest() : iosPermissionsRequest()
  deniedHandler()
}

export const cameraPermissionsDispatcher = (dispatch) => {
  Platform.OS === 'android'
    ? PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then(response => {
      response ? dispatch(authorizeCamera('authorized')) : dispatch(authorizeCamera('denied'))
    })
    : Permissions.requestPermission('camera').then((response) => dispatch(authorizeCamera(response)))
}

export const photoPermissionsDispatcher = (dispatch) => {
  Platform.OS === 'android'
    ? PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => {
      response ? dispatch(authorizePhotos('authorized')) : dispatch(authorizePhotos('denied'))
    })
    : Permissions.requestPermission('photo').then((response) => dispatch(authorizePhotos(response)))
}

export default photoSelection
