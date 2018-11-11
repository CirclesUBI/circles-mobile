// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TextInput
} from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  background1,
  textColor1,
  fonts,
  primary
} from 'circles-mobile/lib/styles'
// import photoSelectionHandler from 'circles-mobile/lib/utilities/photoSelection'
// // Components
import Avatar from 'circles-mobile/lib/components/shared/Avatar'

// Actions
import {
  addData,
  addImageOnboarding,
  addClaims
} from 'circles-mobile/lib/actions/OnboardingActions'

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
    // this.photoSelection = this.photoSelection.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.state = {
      name: null
    }
  }

  onProcess () {
    //  const userData = { ...this.props.userData, name: this.state.name }
    this.props.addData({name: this.state.name})
    this.props.navigation.push('Phone')
    // this.props.storeClaims(this.props.address, userData)
    // this.continue()
  }

  // continue () {
  //   if (Platform.OS === 'ios') {
  //     this.props.navigator.push({
  //       screen: 'onboarding.notifications',
  //       navigatorStyle: {
  //         navBarHidden: true
  //       }
  //     })
  //   } else {
  //     this.props.navigator.push({
  //       screen: 'onboarding.testnetWarning',
  //       navigatorStyle: {
  //         navBarHidden: true
  //       }
  //     })
  //   }
  // }

  // photoSelection () {
  //   // photoSelectionHandler({
  //   //   cameraStatus: this.props.cameraStatus,
  //   //   photoStatus: this.props.photoStatus,
  //   //   segmentId: this.props.segmentId,
  //   //   addFn: this.props.addImageOnboarding
  //   // })
  // }
  handleChange (name) {
    this.setState({ name })
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title='Enter Your Information'
        />
        <View style={{ flex: 0.9 }}>
          <TouchableHighlight
            style={{ alignSelf: 'center', marginTop: 30 }}
            onPress={() => this.photoSelection()}
            underlayColor='rgba(0,0,0,0.0)'
          >
            <View>
              {this.props.userData.avatar ? (
                <Avatar
                  size={124}
                  source={this.props.userData.avatar}
                  initialsStyle={{ fontSize: 36 }}
                />
              ) : (
                <View style={styles.emptyAvatar}>
                  <Text infoButtonLabel style={{ color: textColor1 }}>
                    Upload Photo
                  </Text>
                </View>
              )}
              {!this.props.userData.avatar && (
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
          <TextInput
            style={{
              height: calculateHeightRatio(40),
              width: calculateWidthRatio(285),
              color: '#CECECE',
              fontSize: 16,
              fontFamily: fonts.primaryText,
              borderBottomWidth: 1,
              marginTop: 40,
              alignSelf: 'center',
              textAlign: 'center',
              borderColor: 'rgba(58,59,78,49)'
            }}
            // onSubmitEditing={Keyboard.dismiss}
            value={this.state && this.state.name}
            onChangeText={value => this.handleChange(value)} /* needs test */
            label='Name'
            placeholder='Enter your name'
            placeholderTextColor='#686868'
            autofocus
            keyboardAppearance={'dark'}
          />
        </View>
        {this.state &&
          this.state.name && (
            <View style={{ flex: 0.1, backgroundColor: 'white' }}>
              <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: primary }]}
                onPress={this.onProcess}
              >
                <View>
                  <Text style={[styles.loginText, { textAlign: 'center' }]}>
                    CONTINUE
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          )}
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
    addData: data => {
      dispatch(addData(data))
    },
    storeClaims: (address, data) => {
      dispatch(addClaims(address, data))
    },
    addImageOnboarding: avatarObj => {
      dispatch(addImageOnboarding(avatarObj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingAvatar)
