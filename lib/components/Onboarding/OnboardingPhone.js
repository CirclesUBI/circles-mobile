// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  Keyboard,
  View
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import { PhoneNumberUtil } from 'google-libphonenumber'

// Actions
import { addOnboardingData } from 'circles-mobile/lib/actions/OnboardingActions'
// import { verificationSMS } from 'circles-mobile/lib/actions/uportActions'
// import { Toast } from 'antd-mobile-rn'

// Styles
import { fonts } from 'circles-mobile/lib/styles'

export class OnboardingPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intlDiallingCode: null,
      phone: '',
      phoneValid: false
    }
    this.phoneUtil = PhoneNumberUtil.getInstance()
    this.handleChange = this.handleChange.bind(this)
    this.onProcess = this.onProcess.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    // this.handleselection = this.handleSelection.bind(this)
    // this.dismissModal = this.dismissModal.bind(this)
  }

  onProcess () {
    Keyboard.dismiss()
    this.props.addOnboardingData({ phone: this.state.phone })
    this.props.navigation.push('VerifyPhone')
  }

  handleChange (value) {
    let phone = value
    if (phone[0] === '+') phone = '00' + phone.slice(1)
    phone = phone.replace(/[^\d]/g, '')
    const country = this.props.country
    if ((phone && phone.length < 10) || !PhoneNumberUtil.isViablePhoneNumber(phone)) {
      this.setState({ phoneValid: false, phone: value[0] !== '+' ? '+' + value : value })
      // Toast.fail('Please enter a valid phone number', 3)
    } else {
      let phoneNumObj = this.phoneUtil.parseAndKeepRawInput(phone || '', country)
      let phoneString = '+' + phoneNumObj.getCountryCode() + phoneNumObj.getNationalNumber()
      this.setState({ phoneValid: true, phone: phoneString })
    }
  }

  selectCountry () {
    Keyboard.dismiss()
    this.props.navigator.showModal({
      screen: 'onboarding.selectCountry'
    })
  }

  // handleSelection (value) {
  //   this.props.addOnboardingData({ type: value })
  //   this.continue()
  // }

  // dismissModal () {
  //   this.props.navigator.dismissModal()
  // }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'70%'}
        main={<OnboardingTextInput
          changeHandler={this.handleChange}
          label={'Phone Number'}
          placeholder={'+1 (888) 888-8888'}
          keyboardType={'number-pad'}
          prefixOnPress={this.selectCountry}
          value={this.state.phone}
          // onEndEditing={this.onProcessPhone}
        />}
        nextButton
        buttonActive={this.state.phoneValid}
        buttonPress={this.onProcess}
        footer={
          <View>
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
              marginTop: 10
            }}>
              We will be sending this number a SMS to confirm your account
            </Text>
          </View>
        }
      />
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
