// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TextInput,
  Keyboard,
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
// Utilities

// Actions
import { addOnboardingData } from 'circles-mobile/lib/actions/OnboardingActions'
// import { verificationSMS } from 'circles-mobile/lib/actions/uportActions'

import { Toast } from 'antd-mobile-rn'

// Styles
import {
  fonts,
  secondary,
  width
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

export class OnboardingPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: null,
      phone: '',
      phoneValid: false
    }
    this.onContinue = this.onContinue.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.handleselection = this.handleSelection.bind(this)
    this.phoneUtil = PhoneNumberUtil.getInstance()
    this.selectCountry = this.selectCountry.bind(this)
    this.dismissModal = this.dismissModal.bind(this)
  }

  onContinue () {
    Keyboard.dismiss()
    this.props.navigation.push('VerifyPhone')
  }

  onProcess (value) {
    if (value[0] === '+') value = '00' + value.slice(1)
    value = value.replace(/[^\d]/g, '')
    const country = this.props.country
    if ((value && value.length < 10) || !PhoneNumberUtil.isViablePhoneNumber(value)) {
      this.setState({ phoneValid: false, phone: value })
      Toast.fail('Please enter a valid phone number', 3)
    } else {
      this.setState({ phoneValid: true, phone: value })
      let phoneNumObj = this.phoneUtil.parseAndKeepRawInput(value || '', country)
      let phoneString = '+' + phoneNumObj.getCountryCode() + phoneNumObj.getNationalNumber()
      this.props.addOnboardingData({ phone: phoneString })
    }
  }

  handleSelection (value) {
    this.props.addOnboardingData({ type: value })
    this.continue()
  }

  selectCountry () {
    Keyboard.dismiss()
    this.props.navigator.showModal({
      screen: 'onboarding.selectCountry'
    })
  }

  dismissModal () {
    this.props.navigator.dismissModal()
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='70%' />
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
              prefixOnPress={this.selectCountry}
              onChangeText={value => this.onProcess(value)} /* needs test */
              value={this.state.phone}
              keyboardType={'phone-pad'}
              label='Phone Number'
              placeholder='+1 (888) 888-8888'
              placeholderTextColor='white'
              autofocus
              underlineColorAndroid={'#FFFFFF'}
              returnKeyType='next'
            />
            <View style={{ flex: 0.4 }}>
              <NextButton active={this.state.phoneValid} onPress={this.onContinue} />
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                alignSelf: 'center',
                marginTop: 18
              }}>
                This field is required
              </Text>
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontFamily: fonts.primaryText,
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: 10,
                marginBottom: 50
              }}>
                We will be sending this number a SMS to confirm your account
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    country: state.onboarding.userData.country || 'DE',
    userData: state.onboarding.userData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    }
    // verificationSMS: (phone) => {
    //   dispatch(verificationSMS(phone))
    // }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingPhone)
