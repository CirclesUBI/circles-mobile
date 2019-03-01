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
// import { Toast } from 'antd-mobile-rn'
// Actions

class OnboardingConfirmPassword extends React.Component {
  constructor () {
    super()
    this.state = {
      password: ''
      // passwordValid: false
    }
    // this.onProcessPassword = this.onProcessPassword.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onContinue () {
    this.props.navigation.push('Phone')
  }

  // onProcessPassword (value) {
  //   var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //   if ((this.state.password && this.state.password.length < 8) || !regex.test(this.state.password)) {
  //     this.setState({ passwordValid: false, password: this.state.password })
  //     Toast.fail('Please enter a valid password', 3)
  //   } else {
  //     this.setState({ passwordValid: true, password: this.state.password })
  //     this.props.addOnboardingData({ password: this.state.password })
  //   }
  // }

  handleChange (value) {
    this.setState({ password: value })
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='60%' />
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
              onChangeText={value => this.handleChange(value)} /* needs test */
              // onEndEditing={() => this.onProcessPassword(this.state.password)}
              value={this.state.password}
              label='Confirm Password'
              placeholder='Confirm Password'
              placeholderTextColor='white'
              autofocus
              underlineColorAndroid={'#FFFFFF'}
              returnKeyType='next'
              textContentType='password'
              secureTextEntry
            />
            <View style={{ flex: 0.3 }}>
              <NextButton active={this.state.password === this.props.userData.password} onPress={this.onContinue} />
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

export const mapStateToProps = state => (
  {
    userData: state.onboarding.userData
  }
)

export default connect(
  mapStateToProps
)(OnboardingConfirmPassword)
