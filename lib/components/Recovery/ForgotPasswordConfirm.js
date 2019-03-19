// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Keyboard,
  Text
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'
import OnboardingTextInput from '../Onboarding/shared/OnboardingTextInput'
// import { internationalFormat } from '../../utilities/phoneNumber'
// Actions
import { setVerificationState } from '../../actions/OnboardingActions'

// Styles
import {
  secondary,
  width,
  height,
  fonts,
  textColor1
} from 'circles-mobile/lib/styles'

export class ForgotPasswordConfirm extends React.Component {
  constructor (props) {
    super(props)    
    this.state = {
      password: ''
    }
    this.onContinue = this.onContinue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    // let signUpDetails = {
    //   name: this.props.userData.name,
    //   username: this.props.userData.username,
    //   phone: this.props.userData.phone,
    //   email: this.props.userData.email,
    //   picture: this.props.userData.picture && this.props.userData.picture.uri,
    //   password: this.props.userData.password // hash this
    // }
    // this.props.initSignUp(signUpDetails)
  }

  onContinue () {
    if (this.state.password != this.props.recoveryData.password)
      console.log('passwords dont match')
    else if (this.state.password) {  
      console.log(this.props.recoveryData.username, 
            this.props.recoveryData.code, 
            this.state.password)
      // try {    
      //   const result = await Auth.forgotPasswordSubmit(
      //     this.props.recoveryData.username, 
      //     this.props.recoveryData.code, 
      //     this.state.password
      //   )
      //   console.log(result)      
      // //this.props.navigation.push('Phone')
      // } catch(error) {
      //   console.error(error)
      // }    
    }    
  }

  handleChange (value) {
    value = value.trim()
    this.setState({ password: value })
  }

  render () {
    // const formattedPhone = internationalFormat(
    //   this.props.userData.phone,
    //   this.props.userData.country
    // )

    const showButton = this.props.verificationState === 'verified'
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1 }}>
          <NavBar noClose navFunction={() => this.props.navigation.goBack()} />
          <View style={{ flex: 1 }}>
            <OnboardingTextInput
              changeHandler={this.handleChange}
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
              textContentType='password'
              secureTextEntry
            />
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
          <View style={{ flex: 0.5 }}>
            <NextButton active onPress={this.onContinue} />
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
)(ForgotPasswordConfirm)

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
