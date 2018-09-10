// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  // TextInput,
  Keyboard,
  TouchableHighlight,
  View,
  StyleSheet,
  TextInput
} from 'react-native'
// import { PhoneNumberUtil } from 'google-libphonenumber'
// import TextInput from '../shared/TextInput'
// Utilities

// Actions
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
// import { verificationSMS } from 'circles-mobile/lib/actions/uportActions'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

// Styles
import { background1, fonts, primary, textColor1, textColor4 } from 'circles-mobile/lib/styles'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

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
      phone: ''
    }
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onProcess = this.onProcess.bind(this)
    // this.phoneUtil = PhoneNumberUtil.getInstance()
    this.selectCountry = this.selectCountry.bind(this)
    this.dismissModal = this.dismissModal.bind(this)
  }

  onContinue () {
    Keyboard.dismiss()
    this.props.navigator.push({
      screen: 'onboarding.verifyPhone',
      navigatorStyle: {
        navBarNoBorder: true
      }
    })
  }

  onProcess () {
    this.props.trackSegment('Submit')
    const country = this.props.country
    const phoneNumber = this.phoneUtil.parse(this.state.phone, country)
    const formattedPhone = this.phoneUtil.format(phoneNumber, 0)
    this.props.verificationSMS(formattedPhone)
    this.props.addData({phone: formattedPhone})
  }

  handleChange (phone) {
    this.setState({phone: phone.replace(/[^\d]/g, '')})
    // this.props.clearMessage()
  }

  handleSelection (value) {
    this.props.addData({type: value})
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
    const { country } = this.props
    // const callingCode = this.phoneUtil.getCountryCodeForRegion(country)
    // let phoneNumber
    let validNumber, formattedPhone
    formattedPhone = this.state.phone
    // phoneNumber = this.state.phone && PhoneNumberUtil.isViablePhoneNumber(this.state.phone)
    //   ? this.phoneUtil.parseAndKeepRawInput(this.state.phone || '', country)
    //   : null
    // validNumber = phoneNumber && this.phoneUtil.isValidNumberForRegion(phoneNumber, country)
    // formattedPhone = validNumber ? this.phoneUtil.formatInOriginalFormat(phoneNumber, country) : this.state.phone
    return (
      <View style={{flex: 1, backgroundColor: background1}}>
        <NavBar navFunction={() => this.props.navigation.goBack()} title='Verify Your Phone' />
        <View style={{flex: 0.9}}>
          <Text style={{textAlign: 'center', color: textColor1, marginTop: 15, fontSize: 16}}>Enter Number</Text>
          <Text style={{textAlign: 'center', color: textColor1, marginTop: 15, marginLeft: 30, marginRight: 30}}>
            Please enter your mobile phone
            number to verify your device
          </Text>
          <TextInput
            // prefixValue={`+${callingCode || '00'}`}
            prefixOnPress={this.selectCountry}
            onChangeText={(value) => this.handleChange(value)} /* needs test */
            value={formattedPhone}
            keyboardType={'phone-pad'}
            label='Mobile Number'
            placeholder='Enter your mobile number'
            placeholderTextColor={textColor4}
            autofocus
            underlineColorAndroid={'#FFFFFF'}
            returnKeyType='next'
            onSubmitEditing={() => validNumber && this.onProcess()} /* needs test */
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
              borderColor: 'rgba(58,59,78,49)'}}
          />
        </View>
        {
          formattedPhone && <View style={{flex: 0.1, backgroundColor: 'white'}}>
            <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
              this.props.navigation.push('VerifyPhone')
            }}>
              <View>
                <Text style={[styles.loginText, {textAlign: 'center'}]}>CONTINUE</Text>
              </View>

            </TouchableHighlight>
          </View>
        }

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
    country: state.onboarding.userData.country || 'US'
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addData: (data) => {
      dispatch(addData(data))
    }
    // verificationSMS: (phone) => {
    //   dispatch(verificationSMS(phone))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPhone)