// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import {
  textColor1,
  fonts,
  width,
  secondary
} from 'circles-mobile/lib/styles'
// // Components
import Avatar from 'circles-mobile/lib/components/shared/Avatar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import { ImagePicker, Permissions, LinearGradient } from 'expo'

// Actions
import {
  addOnboardingData,
  saveProfileImage
} from 'circles-mobile/lib/actions/OnboardingActions'

// import { ConsoleLogger } from '@aws-amplify/core'
// const logger = new ConsoleLogger('OnboardingAvatar')

// Styles
const styles = StyleSheet.create({
  emptyAvatar: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 2,
    borderColor: textColor1
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export class OnboardingAvatar extends React.Component {
  constructor (props) {
    super(props)
    this.onProcess = this.onProcess.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.state = {
      name: '',
      picture: 'https://zblogged.com/wp-content/uploads/2016/02/1-3.jpg',
      uploading: false
    }
    // this.props.addOnboardingData({ picture: { uri: this.state.picture } })
  }

  onProcess () {
    this.props.navigation.push('Email')
  }

  async openCamera () {
    let { camPermission } = await Permissions.getAsync(Permissions.CAMERA)
    let { camRollPermission } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    console.log('status of Camera permission: ', camPermission)
    console.log('status of Camera Roll permission: ', camRollPermission)
    if (camPermission !== 'granted' && camRollPermission !== 'granted') {
      console.log('Camera permission not granted!')
      console.log('Asking for permission')
      camPermission = (await Permissions.askAsync(Permissions.CAMERA)).status
      camRollPermission = (await Permissions.askAsync(Permissions.CAMERA_ROLL)).status
      if (camPermission !== 'granted' || camRollPermission !== 'granted') {
        console.log('Asked for permission, but not granted!')
        return
      }
    }

    if (camPermission === 'granted' && camRollPermission === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        exif: false
      })
      if (!pickerResult.cancelled) {
        this.setState({ uploading: true })
        this.props.saveProfileImage(pickerResult)
      }
    }
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='30%' />
            }
            closeFunction={() => this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({
                routeName: 'Main',
                action: NavigationActions.navigate({
                  routeName: 'Intro',
                  action: NavigationActions.navigate({
                    routeName: 'Splash'
                  })
                })
              })]
            }))}
          />
          <View style={{ flex: 0.95, justifyContent: 'space-between' }}>
            <TouchableHighlight
              onPress={this.openCamera}
              underlayColor='rgba(0,0,0,0.0)'
            >
              <View style={{ alignSelf: 'center', marginTop: '30%' }}>
                {this.props.userData.picture ? (
                  <Avatar
                    size={124}
                    source={this.props.userData.picture}
                    initialsStyle={{ fontSize: 36 }}
                  />
                ) : (
                  <View style={styles.emptyAvatar}>
                    <Text infoButtonLabel style={{ color: textColor1 }}>
                      Upload Photo
                    </Text>
                  </View>
                )}
                {!this.props.userData.picture && (
                  <Text
                    style={{
                      color: textColor1,
                      textAlign: 'center',
                      marginTop: 15
                    }}
                  >
                    Tap to upload
                  </Text>
                )}
              </View>
            </TouchableHighlight>
            <View style={{ flex: 0.3 }}>
              <NextButton active={this.props.userData.picture} onPress={this.onProcess} />
              <TouchableHighlight onPress={() => this.props.navigation.push('Email')}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: fonts.primaryText,
                  alignSelf: 'center',
                  marginTop: 18
                }}>Skip ></Text>
              </TouchableHighlight>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    cameraStatus: state.authorization.cameraAuthorized,
    photoStatus: state.authorization.photoAuthorized,
    userData: state.onboarding.userData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    },
    saveProfileImage: avatarObj => {
      dispatch(saveProfileImage(avatarObj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingAvatar)
