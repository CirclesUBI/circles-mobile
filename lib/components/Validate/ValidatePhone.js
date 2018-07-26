import React from 'react'
import { Keyboard, Image, Text, TouchableHighlight, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, secondary, textColorMain, lightBackground, height, darkBackground, mediumLightBackground } from 'circles-mobile/lib/styles/styles'

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
        <View style={{
          height: calculateHeightRatio(66),
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: mediumLightBackground,
          shadowOffset: {width: 0, height: 4},
          shadowColor: 'rgba(7, 7, 7, 0.5)',
          shadowOpacity: 0.2
        }}>
          <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10}} onPress={() => {
            this.props.navigation.navigate('WalletView')
          }}>
            <View style={{flexDirection: 'row', marginLeft: 26, alignItems: 'center'}}>
              <Image style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18)}} source={require('circles-mobile/images/arrowLeft.png')} />
              <Text style={{fontFamily: 'now-alt-regular', color: 'white', marginLeft: 16}}>{`Back`}</Text>
            </View>
          </TouchableHighlight>
        </View>

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
