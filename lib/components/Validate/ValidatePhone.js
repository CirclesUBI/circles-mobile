import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Text, TouchableHighlight, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, fonts } from 'circles-mobile/lib/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

class ValidatePhone extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = { text: '' }
    this.translate = translate
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  handleChange (value) {
    this.setState({text: value})
    // this.props.clearMessage()
  }

  handleValidate () {
    this.props.validatedUser()
    this.props.navigation.navigate('ValidateSuccess')
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: background5}}>
        <NavBar navFunction={() => this.props.navigation.navigate('WalletView')} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <Image style={{width: calculateWidthRatio(99), height: calculateHeightRatio(99), marginTop: calculateHeightRatio(26), resizeMode: 'contain'}} source={require('circles-mobile/images/logo.png')} />
            <Text style={{color: 'white', textAlign: 'center', fontFamily: fonts.boldText, fontSize: 20, marginTop: calculateHeightRatio(20)}}>
              {this.translate('The Circles Team')}
            </Text>
            <Text style={{color: 'white', textAlign: 'center', fontFamily: fonts.primaryText, width: calculateWidthRatio(260), marginTop: calculateHeightRatio(21)}}>
              {this.translate('Validation is a way to prove your identity, extending your ability to transact with individuals and organizations.')} <Text style={{fontFamily: fonts.primaryText, color: '#FFAE00'}}>{this.translate('Contact the validator to get your code.')}</Text>
            </Text>
            <TouchableHighlight style={{marginTop: calculateHeightRatio(38)}}>
              <View style={{width: calculateWidthRatio(218), height: calculateHeightRatio(48), borderColor: '#CECECE', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TextInput
                  style={{color: '#CECECE', fontSize: 12, textAlign: 'center', fontFamily: fonts.primaryText}}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange(value)} /* needs test */
                  keyboardType={'phone-pad'}
                  label={this.translate('Mobile Number')}
                  placeholder={this.translate('Enter Code')}
                  placeholderTextColor='#C0C0C0'
                  autofocus
                  keyboardAppearance={'dark'}
                />
                {/* <Text style={{color: '#CECECE', fontSize: 12, textAlign: 'center'}}>Enter Code</Text> */}
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{flex: 1, marginTop: 20}} onPress={() => this.handleValidate()}>
              <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
                <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontFamily: fonts.primaryText}}>
                  {this.translate('SUBMIT')}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

ValidatePhone.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(ValidatePhone)
