import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, fonts } from 'circles-mobile/lib/styles'

class PayAmount extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = { text: '' }
    this.translate = translate
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({text: value})
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: background5}}>
        <NavBar navFunction={() => this.props.navigation.navigate('Home')} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontFamily: fonts.boldText, fontSize: 20, color: 'white', marginTop: 50}}>
                {`From: ${this.props.selectedWallet}`}
              </Text>
              {/* <Text style={{fontFamily: fonts.primaryText, fontSize: 20, color: '#5D5D6A', marginTop: 10}}>Requests</Text> */}
              <View style={{
                width: calculateWidthRatio(170),
                borderColor: '#2E2F42',
                borderBottomWidth: 4,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
                flexDirection: 'row'
              }}>
                <TextInput
                  style={{
                    color: '#FFFFFF',
                    fontSize: 60,
                    fontFamily: fonts.titleText,
                    textAlign: 'right',
                    marginLeft: 5
                  }}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange(value)} /* needs test */
                  keyboardType={'phone-pad'}
                  label={this.translate('Request Amount')}
                  placeholder={'0'}
                  placeholderTextColor='#FFFFFF'
                  autofocus
                  keyboardAppearance={'dark'}
                />
                <Text style={{color: '#FFFFFF', fontSize: 60, textAlign: 'center', fontFamily: fonts.titleText, marginTop: 10}}>
                  {` CCS`}
                </Text>
              </View>
            </View>
            <KeyboardAvoidingView style={{height: calculateHeightRatio(56)}}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate('PayContacts', {screen: 'PayConfirm', wallet: this.props.selectedWallet, amount: this.state.text})
                }>
                <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
                  <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center', fontFamily: fonts.primaryText}}>
                    {this.translate('SELECT CONTACT')}
                  </Text>
                </View>
              </TouchableHighlight>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

PayAmount.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    selectedWallet: state.user.selectedTransactionWallet
  }
}

export default connect(mapStateToProps)(PayAmount)
