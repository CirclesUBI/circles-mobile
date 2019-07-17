// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  Keyboard,
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'
import { PhoneNumberUtil } from 'google-libphonenumber'

// Actions
import { signOut, initRecoverAccount } from 'circles-mobile/lib/actions/AuthActions'
import { wipeRecoveryData } from 'circles-mobile/lib/actions/RecoveryActions'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

const PasswordCheck = (props) => (
  <Text style={{
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.primaryText,
    alignSelf: 'center',
    marginTop: 5
  }}>
    {props.check}
  </Text>
)

export class RecoveryPhoneNumConfirm extends React.Component {
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
  }

  onProcess () {
    Keyboard.dismiss()
    // this.props.addRecoveryData({ phone: this.state.phone })
    this.props.initRecoverAccount({phone: this.state.phone})   
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

  render () {    
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <OnboardingTextInput
              changeHandler={this.handleChange}
              label={'Phone Number'}
              placeholder={'+1 (888) 888-8888'}
              keyboardType={'number-pad'}
              prefixOnPress={this.selectCountry}
              value={this.state.phone}
              // onEndEditing={this.onProcessPhone}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active={this.state.phoneValid} onPress={this.onProcess} />
          </View>
        </LinearGradient>
      </View>        
    )
  }
}

const mapStateToProps = state => {
  return {    
    recoveryData: state.recovery.recoveryData,
    country: state.onboarding.userData.country || 'DE',
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut())
    },
    wipeRecoveryData: () => {
      dispatch(wipeRecoveryData())
    },
    initRecoverAccount: (data) => {
      dispatch(initRecoverAccount(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryPhoneNumConfirm)
