// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  TextInput,
  Keyboard,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { PhoneNumberUtil } from 'google-libphonenumber'
// Utilities

// Actions
import { addOnboardingData } from 'circles-mobile/lib/actions/OnboardingActions'
// import { verificationSMS } from 'circles-mobile/lib/actions/uportActions'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

import { Toast } from 'antd-mobile-rn'

// Styles
import {
  background1,
  fonts,
  primary,
  textColor1,
  textColor4
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

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

export class OnboardingPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: null,
<<<<<<< HEAD
      phone: '+4917643698891',
      email: 'edzillion@gmail.com',
      phoneValid: true,
      emailValid: true
=======
      phone: 'Enter Phone Number',
      email: 'Enter Email',
      phoneValid: false,
      emailValid: false
>>>>>>> continue app updates for
    }
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.phoneUtil = PhoneNumberUtil.getInstance()
    this.selectCountry = this.selectCountry.bind(this)
    this.dismissModal = this.dismissModal.bind(this)

    this.props.addOnboardingData({ phone: this.state.phone })
    this.props.addOnboardingData({ email: this.state.email })
  }

  onContinue () {
    Keyboard.dismiss()
    this.props.navigation.push('VerifyPhone')
  }

  onProcess (value) {
    const country = this.props.country
    let phoneNumObj
    if ((this.state.phone && this.state.phone.length < 10) || !PhoneNumberUtil.isViablePhoneNumber(this.state.phone)) {
      this.setState({ phoneValid: false })
      Toast.fail('Please enter a valid phone number', 3)
    } else {
      this.setState({ phoneValid: true })
      phoneNumObj = this.phoneUtil.parseAndKeepRawInput(this.state.phone || '', country)
      let phoneString = '+' + phoneNumObj.getCountryCode() + phoneNumObj.getNationalNumber()
      this.props.addOnboardingData({ phone: phoneString })
    }
  }

  onProcessEmail (value) {
    var regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ((this.state.email && this.state.email.length < 6) || !regex.test(this.state.email)) {
      this.setState({ emailValid: false })
      Toast.fail('Please enter a valid email', 3)
    } else {
      this.setState({ emailValid: true })
      this.props.addOnboardingData({ email: this.state.email })
    }
  }

  handleChange (phone) {
    if (phone[0] === '+') phone = '00' + phone.slice(1)
    this.setState({ phone: phone.replace(/[^\d]/g, '') })
  }

  handleEmailChange (email) {
    this.setState({ email: email })
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
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title='Verify Your Phone'
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 0.9 }}>
            <Text
              style={{
                textAlign: 'center',
                color: textColor1,
                marginTop: 15,
                fontSize: 16
              }}
            >
              Enter Number
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: textColor1,
                marginTop: 15,
                marginLeft: 30,
                marginRight: 30
              }}
            >
              Please enter your mobile phone number to verify your device
            </Text>
            <TextInput
              // prefixValue={`+${callingCode || '00'}`}
              prefixOnPress={this.selectCountry}
              onChangeText={value => this.handleChange(value)} /* needs test */
              value={this.state.phone}
              keyboardType={'phone-pad'}
              label='Mobile Number'
              placeholder='Enter your mobile number'
              placeholderTextColor={textColor4}
              autofocus
              underlineColorAndroid={'#FFFFFF'}
              returnKeyType='next'
              onSubmitEditing={(val) => {
                // validNumber && this.onProcess()
                this.onProcess(val)
              }
              } /* needs test */
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
            />
            <Text
              style={{
                textAlign: 'center',
                color: textColor1,
                marginTop: 45,
                marginLeft: 30,
                marginRight: 30
              }}
            >
              Please enter your email address
            </Text>
            <TextInput
              onChangeText={value => this.handleEmailChange(value)} /* needs test */
              value={this.state.email}
              keyboardType={'email-address'}
              label='Email'
              placeholder='Enter your email address'
              placeholderTextColor={textColor4}
              // autofocus
              underlineColorAndroid={'#FFFFFF'}
              returnKeyType='next'
              onSubmitEditing={() => {
                // validNumber && this.onProcess()
                this.onProcessEmail()
              }
              } /* needs test */
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
            />
          </View>
        </TouchableWithoutFeedback>
<<<<<<< HEAD
        {this.state.phoneValid && this.state.emailValid && (
          <View style={{ flex: 0.1, backgroundColor: 'white' }}>
=======
        {this.state.phoneValid && this.state.emailValid
          ? (<View style={{ flex: 0.1, backgroundColor: 'white' }}>
>>>>>>> continue app updates for
            <TouchableHighlight
              style={[styles.loginButton, { backgroundColor: primary }]}
              onPress={() => {
                this.onContinue()
              }}
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

    // {/* <TouchableOpacity
    //   onPress={() => {
    //     this.props.navigator.showModal({ /* needs test */
    //       screen: 'onboarding.phoneWhyLightbox',
    //       passProps: {
    //         title: 'privacy',
    //         onClose: this.dismissModal
    //       },
    //       navigatorStyle: {
    //         navBarHidden: true,
    //         screenBackgroundColor: 'rgba(0,0,0,0.8)'
    //       }
    //     })
    //   }}>
    //   <Text infoButtonLabel>Why?</Text>
    // </TouchableOpacity> */}
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
