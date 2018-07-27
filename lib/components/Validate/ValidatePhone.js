import React from 'react'
import { Image, Text, TouchableHighlight, View, TextInput } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground } from 'circles-mobile/lib/styles/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'

class ValidatePhone extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (value) {
    this.setState({text: value})
    // this.props.clearMessage()
  }
  render () {
    return (
      <View style={{flex: 1, backgroundColor: darkBackground}}>
        <NavBar navigation={this.props.navigation} route={'WalletView'} />
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Image style={{width: calculateWidthRatio(99), height: calculateHeightRatio(99), marginTop: calculateHeightRatio(26)}} source={require('circles-mobile/images/logo.png')} />
          <Text style={{color: 'white', textAlign: 'center', fontFamily: 'now-alt-bold', fontSize: 20, marginTop: calculateHeightRatio(20)}}>
            The Circles Team
          </Text>
          <Text style={{color: 'white', textAlign: 'center', fontFamily: 'now-alt-regular', width: calculateWidthRatio(260), marginTop: calculateHeightRatio(21)}}>
            Validation is a way to prove your identity, extending your ability to transact with individuals and organizations. <Text style={{fontFamily: 'now-alt-regular', color: '#FFAE00'}}>Contact the validator to get your code.</Text>
          </Text>
          <TouchableHighlight style={{marginTop: calculateHeightRatio(38)}}>
            <View style={{width: calculateWidthRatio(218), height: calculateHeightRatio(48), borderColor: '#CECECE', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput
                style={{color: '#CECECE', fontSize: 12, textAlign: 'center', fontFamily: 'now-alt-regular'}}
                // onSubmitEditing={Keyboard.dismiss}
                value={this.state && this.state.text}
                onChangeText={(value) => this.handleChange(value)} /* needs test */
                keyboardType={'phone-pad'}
                label='Mobile Number'
                placeholder='Enter Code'
                placeholderTextColor='#C0C0C0'
                autofocus
                keyboardAppearance={'dark'}
              />
              {/* <Text style={{color: '#CECECE', fontSize: 12, textAlign: 'center'}}>Enter Code</Text> */}
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1, marginTop: 20}} onPress={() => this.props.navigation.navigate('ValidateSuccess')}>
            <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
              <Text style={{color: '#FFFFFF', fontSize: 12, textAlign: 'center', fontFamily: 'now-alt-regular'}}>
                SUBMIT
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default ValidatePhone
