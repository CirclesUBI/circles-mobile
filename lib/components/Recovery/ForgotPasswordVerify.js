// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'

// Actions
import { setVerificationState } from '../../actions/OnboardingActions'
import {
  addRecoveryData
} from 'circles-mobile/lib/actions/RecoveryActions'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

export class ForgotPasswordVerify extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      verificationCode: null,      
    }
    this.onProcess = this.onProcess.bind(this)
    this.handleCodeChange = this.handleCodeChange.bind(this)
  }

  onProcess () {    
    if (this.props.verificationState === 'unverified' || this.props.verificationState === 'unconfirmed') {
      this.props.addRecoveryData({code: this.state.verificationCode})
      this.props.navigation.push('ForgotUpdate')
    }
  }

  handleCodeChange (verificationCode) {
    if (this.props.verificationState === 'verified') return
    verificationCode = verificationCode.trim()
    this.setState({ verificationCode })
    if (verificationCode.length < 6) setVerificationState('incomplete')
    else if (verificationCode.length === 0) {
      setVerificationState('unverified')
    }
  }

  render () {
    const buttonActive = (this.state.verificationCode && this.state.verificationCode.length === 6)
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
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
                ENTER {this.props.recoveryData.DeliveryMedium} CODE
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
              We have sent a {this.props.recoveryData.DeliveryMedium} code to
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                {`${this.props.recoveryData.Destination}`}
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
              changeHandler={this.handleCodeChange}
              label={'Verification Code'}
              placeholder={'Enter 6-digit Code'}
              maxLength={6}
              value={this.state.verificationCode}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <NextButton active={buttonActive} onPress={this.onProcess} />
          </View>
        </LinearGradient>
      </View>        
    )
  }
}

const mapStateToProps = state => {
  return {
    verificationState: state.recovery.verificationState,
    recoveryData: state.recovery.recoveryData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    setVerificationState: (verificationState) => {
      dispatch(setVerificationState(verificationState))
    },
    addRecoveryData: data => {
      dispatch(addRecoveryData(data))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordVerify)
