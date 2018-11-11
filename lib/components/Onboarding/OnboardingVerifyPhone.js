// Frameworks
import React from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native'
import { internationalFormat } from 'circles-mobile/lib/utilities/phoneNumber'

// Actions
import { addData } from 'circles-mobile/lib/actions/OnboardingActions'
// import {
//   verificationCall,
//   verifyPhoneCode
// } from 'circles-mobile/lib/actions/uportActions'
// import TextInput from '../shared/TextInput'
import { debounce } from 'lodash'

// import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'react-native-aws-cognito-js'

// Styles
import {
  background1,
  fonts,
  primary,
  textColor4,
  textColor1,
  textColor2
} from 'circles-mobile/lib/styles'
import {
  calculateWidthRatio,
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

import NavBar from 'circles-mobile/lib/components/shared/Navbar'

import { Auth, CognitoUserAttribute } from 'aws-amplify'

const styles = StyleSheet.create({
  pinBox: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 60,
    marginRight: 60,
    borderBottomWidth: 1
  },
  pinInput: {
    flex: 1,
    fontFamily: fonts.primaryText,
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    height: 50
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: this.state && this.state.verified ? primary : textColor4
  }
})
// Constants

export class OnboardingVerifyPhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      verificationCode: null,
      verified: false,
      buttonMessage: '',
      accessControl: null,
      cognitoUser: null
    }
    // this.onProcess = this.onProcess.bind(this)
    // this.handlePhoneCall = debounce(props.verificationCall, 1000, {leading: true, trailing: false})
    // this.handleCancel = this.handleCancel.bind (this)
    // this.onContinue = this.onContinue.bind(this)
    this.textInputsRefs = []
  }

  componentDidMount () {
    console.log('OnboardingPhone component did mount')

    let username = 'edzillion' //'+4917643698891'
    let password = 'bl8hbl8h'

    const attributeList = []
    const attributeName = new CognitoUserAttribute({
      Name: 'given_name',
      Value: this.props.userData.name
    })
    const attributePhone = new CognitoUserAttribute({
      Name: 'name',
      Value: this.props.userData.phone
    })

    attributeList.push(attributeName)
    attributeList.push(attributePhone)

    let finalRequiredAttributes = {
      name: 'Ed',
      phone_number: username
    }

    let signUpObj = {
      username: username,
      password: password,
      attributes: {
        email: 'edzillion@gmail.com'
      }
    }

    Auth.signUp({
      signUpObj
      // username,
      // password,
      // attributes: {
      //   email: 'edzillion@gmail.com'
      //   // name: 'Ed',
      //   // given_name: 'Ed',
      //   // phone_number: this.state.phone
      // },
      // validationData: []  //optional
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))


          

    // 1) Create User Pool
    // this.userPool = new CognitoUserPool({
    //   UserPoolId: 'eu-central-1_iE0irHiCh',
    //   ClientId: '29tih5pqjv0ejbecp6lr58tdp2'
    // })

    // let username = '+4917643698891'
    // let password = 'bl8hbl8h'

    // var authenticationDetails = new AuthenticationDetails({
    //   Username: username,
    //   Password: password
    // })
    // let User = new CognitoUser({
    //   Username: username,
    //   Pool: this.userPool.UserPoolId
    // })
    // User.authenticateUser(authenticationDetails, {
    //   onSuccess: console.log('success'),
    //   onFailure: console.log('fail')
    // })
  }

  // async createUserInAmazonCognito () {
  //   console.log('create user', this.state, this.props)
  //   // Fill required atributes
  //   const attributeList = []
  //   const attributeName = new CognitoUserAttribute({
  //     Name: 'given_name',
  //     Value: this.props.userData.name
  //   })
  //   const attributePhone = new CognitoUserAttribute({
  //     Name: 'name',
  //     Value: this.props.userData.phone
  //   })

  //   attributeList.push(attributeName)
  //   attributeList.push(attributePhone)
  //   var cognitoUser
  //   // Call SignUp function
  //   await this.userPool.signUp(this.props.userData.phone, 'password', attributeList, null, (err, result) => {
  //     if (err) {
  //       console.log('Error at signup ', err)
  //       return
  //     }
  //     cognitoUser = result.user
  //     this.setState({cognitoUser})
  //     console.log('cognitoUser', cognitoUser)
  //     this.storeCredentials(cognitoUser)
  //   })
  // }

  // confirmCode () {
  //   const cognitoUser = new CognitoUser({
  //     Username: this.props.userData.phone,
  //     Pool: this.userPool
  //   })
  //   cognitoUser.confirmRegistration(this.state.verificationCode, true, (err, result) => {
  //     if (err) {
  //       console.log('Error at confirmRegistration ', err)
  //       this.setState({ buttonMessage: 'FAILED' })
  //       return
  //     }
  //     if (result === 'SUCCESS') {
  //       console.log('phone verified')
  //       this.setState({ verified: true, buttonMessage: 'VERIFIED' })
  //     }
  //   })
  // }

  onProcess () {
    Keyboard.dismiss()
    // this.props.verifyPhoneCode(null, this.state.verificationCode)
    // this.confirmCode()
  }

  handleChange (verificationCode) {
    if (verificationCode.length < 6) {
      this.setState({ buttonMessage: 'INCOMPLETE' })
    }
    this.setState({ verificationCode })
  }

  render () {
    const formattedPhone = internationalFormat(
      this.props.userData.phone,
      this.props.userData.country
    )
    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title='Activation Code'
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 0.9 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                Code sent to {`${formattedPhone}`}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: textColor1,
                  marginTop: 15
                }}
              >
                Please enter the 6 digit activation code sent to your mobile
              </Text>
            </View>

            <TouchableOpacity
              disabled={this.props.offline || this.props.calling}
              onPress={this.handlePhoneCall}
              style={{ alignSelf: 'center', marginTop: 15 }}
            >
              <Text infoButtonLabel style={{ color: textColor2 }}>
                Call Me
              </Text>
            </TouchableOpacity>
            <TextInput
              style={[
                // styles.pinInput,
                {
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
                }
              ]}
              onChangeText={value => this.handleChange(value)}
              value={this.state.verificationCode}
              keyboardType='numeric'
              label='Verification code'
              placeholder='Enter 6-digit code'
              placeholderTextColor={textColor4}
              maxLength={6}
              autofocus
              returnKeyType='go'
              onSubmitEditing={() =>
                this.state.verificationCode &&
                this.state.verificationCode.length === 6 &&
                this.onProcess()
              }
            />
          </View>
        </TouchableWithoutFeedback>
        {this.state &&
          this.state.verificationCode && (
            <View style={{ flex: 0.1, backgroundColor: 'white' }}>
              <TouchableOpacity
                disabled={!this.state.verified}
                style={[styles.loginButton]}
                onPress={() => {
                  this.props.navigation.push('Testnet')
                }}
              >
                <View>
                  <Text style={[styles.loginText, { textAlign: 'center' }]}>
                    {this.state.buttonMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
      // {/* <ProcessCard
      //   process='verifyPhoneCode'
      //   invalid={!this.state.verificationCode || this.state.verificationCode.length !== 6}
      //   onProcess={this.onProcess.bind(this)}
      //   onContinue={this.onContinue.bind(this)}
      //   keyboardVerticalOffset={55}
      // > */}
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.onboarding.userData
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    addData: data => {
      dispatch(addData(data))
    }
    // verificationCall: () => {
    //   dispatch(verificationCall())
    // },
    // verifyPhoneCode: (address, code) => {
    //   dispatch(verifyPhoneCode(address, code))
    // }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingVerifyPhone)
