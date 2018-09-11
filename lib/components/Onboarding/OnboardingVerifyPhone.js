// Frameworks
import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";
import { internationalFormat } from "circles-mobile/lib/utilities/phoneNumber";

// Actions
import { addData } from "circles-mobile/lib/actions/OnboardingActions";
// import {
//   verificationCall,
//   verifyPhoneCode
// } from 'circles-mobile/lib/actions/uportActions'
// import TextInput from '../shared/TextInput'
import { debounce } from "lodash";

// Styles
import {
  background1,
  fonts,
  primary,
  textColor4,
  textColor1,
  textColor2
} from "circles-mobile/lib/styles";
import {
  calculateWidthRatio,
  calculateHeightRatio
} from "circles-mobile/lib/utilities/sizingHelper";

import NavBar from "circles-mobile/lib/components/shared/Navbar";
const styles = StyleSheet.create({
  pinBox: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    height: 50
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: "white",
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
// Constants

export class OnboardingVerifyPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: null
    };
    // this.onProcess = this.onProcess.bind(this)
    // this.handlePhoneCall = debounce(props.verificationCall, 1000, {leading: true, trailing: false})
    // this.handleCancel = this.handleCancel.bind (this)
    // this.onContinue = this.onContinue.bind(this)
    this.textInputsRefs = [];
  }

  onProcess() {
    Keyboard.dismiss();
    this.props.verifyPhoneCode(null, this.state.verificationCode);
  }

  handleChange(verificationCode) {
    this.setState({ verificationCode });
  }

  render() {
    const formattedPhone = internationalFormat(
      this.props.userData.phone,
      this.props.userData.country
    );
    return (
      <View style={{ flex: 1, backgroundColor: background1 }}>
        <NavBar
          navFunction={() => this.props.navigation.goBack()}
          title="Activation Code"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 0.9 }}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: textColor1,
                  marginTop: 15
                }}
              >
                Code sent to {`${formattedPhone}`}
              </Text>
              <Text
                style={{
                  textAlign: "center",
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
              style={{ alignSelf: "center", marginTop: 15 }}
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
                  color: "#CECECE",
                  fontSize: 16,
                  fontFamily: fonts.primaryText,
                  borderBottomWidth: 1,
                  marginTop: 40,
                  alignSelf: "center",
                  textAlign: "center",
                  borderColor: "rgba(58,59,78,49)"
                }
              ]}
              onChangeText={value => this.handleChange(value)}
              value={this.state.verificationCode}
              keyboardType="numeric"
              label="Verification code"
              placeholder="Enter 6-digit code"
              placeholderTextColor={textColor4}
              maxLength={6}
              autofocus
              returnKeyType="go"
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
            <View style={{ flex: 0.1, backgroundColor: "white" }}>
              <TouchableHighlight
                style={[styles.loginButton, { backgroundColor: primary }]}
                onPress={() => {
                  this.props.navigation.push("Testnet");
                }}
              >
                <View>
                  <Text style={[styles.loginText, { textAlign: "center" }]}>
                    CONTINUE
                  </Text>
                </View>
              </TouchableHighlight>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.onboarding.userData
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    addData: data => {
      dispatch(addData(data));
    }
    // verificationCall: () => {
    //   dispatch(verificationCall())
    // },
    // verifyPhoneCode: (address, code) => {
    //   dispatch(verifyPhoneCode(address, code))
    // }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingVerifyPhone);
