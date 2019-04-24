// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
// import { internationalFormat } from '../../utilities/phoneNumber'
// Actions
import { initSignUp, confirmSignUp } from '../../actions/AuthActions'
import { setVerificationState } from '../../actions/OnboardingActions'

// Styles
import {
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

export class OnboardingVerifyPhone extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      verificationCode: null
    }
    this.translate = translate
    this.textInputsRefs = []
    this.onProcess = this.onProcess.bind(this)
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    let signUpDetails = {
      name: this.props.userData.name,
      username: this.props.userData.username,
      phone: this.props.userData.phone,
      email: this.props.userData.email,
      picture: this.props.userData.picture && this.props.userData.picture.uri,
      password: this.props.userData.password // hash this
    }
    this.props.initSignUp(signUpDetails)
  }

  onProcess () {
    Keyboard.dismiss()
    if (this.props.verificationState === 'unverified' || this.props.verificationState === 'unconfirmed') {
      let confirmsignUpDetails = {
        username: this.props.userData.username,
        phone: this.props.userData.phone,
        password: this.props.userData.password,
        code: this.state.verificationCode
      }
      this.props.confirmSignUp(confirmsignUpDetails)
    }
  }

  onContinue () {
    this.props.navigation.push('SeedPhrase')
  }

  handleChange (verificationCode) {
    if (this.props.verificationState === 'verified') return
    verificationCode = verificationCode.trim()
    this.setState({ verificationCode })
    // if (verificationCode.length < 6) setVerificationState('incomplete')
    // else if (verificationCode.length === 0) {
    //   // setVerificationState('unverified')
    // }
  }

  render () {
    // const formattedPhone = internationalFormat(
    //   this.props.userData.phone,
    //   this.props.userData.country
    // )

    // const showButton = this.props.verificationState === 'verified'
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'80%'}
        main={
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: fonts.titleText,
                  marginTop: '40%'
                }}
              >
                {this.translate('ENTER SMS CODE')}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                {this.translate('We have sent a SMS code to')}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                {`${this.props.userData.phone}`}
              </Text>
            </View>
            <OnboardingTextInput
              style={{
                // marginTop: '10%',
                height: '10%',
                width: '85%',
                color: '#CECECE',
                fontSize: 16,
                fontFamily: fonts.primaryText,
                borderBottomWidth: 1,
                marginTop: 40,
                alignSelf: 'center',
                textAlign: 'center',
                borderColor: 'rgba(58,59,78,49)'
              }}
              changeHandler={this.handleChange}
              label={this.translate('Verification Code')}
              placeholder={this.translate('Enter 6-digit Code')}
              maxLength={6}
              value={this.state.verificationCode}
              keyboardType={'number-pad'}
            />
          </View>
        }
        nextButton
        buttonActive={this.state.verificationCode && this.state.verificationCode.length === 6}
        buttonPress={this.onProcess}
        buttonText={this.translate('ENTER CODE')}
        footer={
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: fonts.primaryText,
            alignSelf: 'center',
            marginTop: 18
          }}>
            {this.translate("Didn't receive a code?")}
          </Text>
        }
      />
    )
  }
}

OnboardingVerifyPhone.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    userData: state.onboarding.userData,
    verificationState: state.onboarding.verificationState
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    initSignUp: (signUpDetails) => {
      dispatch(initSignUp(signUpDetails))
    },
    confirmSignUp: (confirmsignUpDetails) => {
      dispatch(confirmSignUp(confirmsignUpDetails))
    },
    setVerificationState: (verificationState) => {
      dispatch(setVerificationState(verificationState))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingVerifyPhone)

/* <TouchableOpacity
  disabled={this.props.offline || this.props.calling}
  onPress={this.handlePhoneCall}
  style={{ alignSelf: 'center', marginTop: 15 }}
>
  <Text infoButtonLabel style={{ color: textColor2 }}>
    Call Me
  </Text>
</TouchableOpacity>
*/
