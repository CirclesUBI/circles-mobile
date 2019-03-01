import React from 'react'
import {
  View,
  TextInput,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import {
  secondary,
  width,
  fonts
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import { Toast } from 'antd-mobile-rn'
// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

class OnboardingEmail extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      emailValid: false
    }
    this.onChange = this.onChange.bind(this)
    this.onProcessEmail = this.onProcessEmail.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  onContinue () {
    // this.props.addOnboardingData({ email: this.state.email })
    this.props.navigation.push('Password')
  }

  onProcessEmail () {
    var regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ((this.state.email && this.state.email.length < 6) || !regex.test(this.state.email)) {
      this.setState({ emailValid: false, email: this.state.email })
      Toast.fail('Please enter a valid email', 3)
    } else {
      this.setState({ emailValid: true, email: this.state.email })
      this.props.addOnboardingData({ email: this.state.email })
    }
  }
  onChange (value) {
    this.setState({ email: value })
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='40%' />
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
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TextInput
              style={{
                width: calculateWidthRatio(285),
                color: 'white',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                borderBottomWidth: 1,
                marginTop: '40%',
                alignSelf: 'center',
                textAlign: 'left',
                borderColor: 'white',
                paddingBottom: 10
              }}
              onChangeText={value => this.onChange(value)} /* needs test */
              onEndEditing={this.onProcessEmail}
              value={this.state.email}
              keyboardType={'email-address'}
              label='Email'
              placeholder='Email'
              placeholderTextColor='white'
              autofocus
              returnKeyType='next'
            />
            <View style={{ flex: 0.3 }}>
              <NextButton active={this.state.emailValid} onPress={this.onContinue} />
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                alignSelf: 'center',
                marginTop: 18
              }}>
                This field is required
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OnboardingEmail)
