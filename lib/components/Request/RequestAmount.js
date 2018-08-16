import React from 'react'
import { View, Text, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground } from 'circles-mobile/lib/styles/styles'

class RequestAmount extends React.Component {
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
        <NavBar navFunction={() => this.props.navigation.navigate('Home')} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontFamily: 'now-alt-bold', fontSize: 20, color: 'white', marginTop: 50}}>Ashoka Finley</Text>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, color: '#5D5D6A', marginTop: 10}}>Requests</Text>
            <View style={{width: calculateWidthRatio(170), borderColor: '#2E2F42', borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center', marginTop: 40, flexDirection: 'row'}}>
              <TextInput
                style={{color: '#FFFFFF', fontSize: 60, fontFamily: 'ostrich-sans-heavy', textAlign: 'right', marginLeft: 5}}
                // onSubmitEditing={Keyboard.dismiss}
                value={this.state && this.state.text}
                onChangeText={(value) => this.handleChange(value)} /* needs test */
                keyboardType={'phone-pad'}
                label='Request Amount'
                placeholder={'0'}
                placeholderTextColor='#FFFFFF'
                autofocus
                keyboardAppearance={'dark'}
              />
              <Text style={{color: '#FFFFFF', fontSize: 60, textAlign: 'center', fontFamily: 'ostrich-sans-heavy', marginTop: 10}}> CCS</Text>
            </View>
          </View>
          <KeyboardAvoidingView style={{height: calculateHeightRatio(56)}}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('RequestQR')}>
              <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
                <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center', fontFamily: 'now-alt-regular'}}>
                  REQUEST
                </Text>
              </View>
            </TouchableHighlight>
          </KeyboardAvoidingView>

        </View>
      </View>
    )
  }
}

export default RequestAmount
