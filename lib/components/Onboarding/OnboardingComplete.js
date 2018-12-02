// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

// Styles
import { background1, primary, fonts, textColor1 } from 'circles-mobile/lib/styles'
const styles = StyleSheet.create({
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
export class OnboardingComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      touched: false
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress () {
    // this.props.finishOnboarding()
    this.props.navigation.resetTo('HomeScreen')
  }

  render () {
    const finishedText = 'Congratulations! You\'ve successfully created your account.'
    return (
      <View style={{flex: 1, backgroundColor: background1}}>
        <NavBar noBack title='Success!' />
        <View style={{flex: 0.9}}>
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Image
              source={require('circles-mobile/images/logo.png')} />
          </View>
          <Text style={{fontFamily: fonts.boldText, color: textColor1, marginTop: 60, textAlign: 'center', fontSize: 18, marginLeft: 30, marginRight: 30}}>
            {finishedText}
          </Text>

        </View>
        <View style={{flex: 0.1, backgroundColor: 'white'}}>
          <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
            this.props.navigation.navigate('HomeScreen')
          }}>
            <View>
              <Text style={[styles.loginText, {textAlign: 'center'}]}>CONTINUE</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // address: currentAddress(state),
    // segmentId: segmentId(state),
    // completed: completed(state, 'unnu')
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    // finishOnboarding: () => {
    //   !global.testing ? Intercom.logEvent('finishOnboarding') : null
    //   dispatch(activationEvent('ONBOARDED'))
    //   dispatch(track('Onboarding Complete Finished'))
    // },
    // registerDeviceForNotifications: () => {
    //   dispatch(registerDeviceForNotifications())
    // },
    // trackSegment: (event) => {
    //   dispatch(track(`Onboarding Complete ${event}`))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingComplete)
