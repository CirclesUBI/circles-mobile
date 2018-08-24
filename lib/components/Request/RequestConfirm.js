import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, fonts } from 'circles-mobile/lib/styles/styles'
import { requestPayment } from 'circles-mobile/lib/actions/WalletActions'
class RequestConfirm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    // this.getContacts = this.getContacts.bind(this)
  }
  handleChange (value) {
    this.setState({text: value})
    // this.props.clearMessage()
  }
  render () {
    let { wallet, to, amount } = this.props.navigation.state.params
    return (
      <View style={{flex: 1, backgroundColor: '#161724'}}>
        <NavBar navFunction={() => this.props.navigation.goBack()} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'now-alt-bold', fontSize: 20, color: 'white', marginTop: calculateHeightRatio(50)}}>{wallet}</Text>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, color: '#5D5D6A', marginTop: calculateHeightRatio(10)}}>Requests</Text>
            <Text style={{color: '#FFFFFF', fontSize: 60, fontFamily: fonts.titleText, textAlign: 'center', marginTop: calculateHeightRatio(40)}}>
              {`${amount} CCS`}
            </Text>
            <View style={{
              height: calculateWidthRatio(53),
              width: calculateWidthRatio(375),
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 20,
              flexDirection: 'row',
              backgroundColor: background5
            }}>
              <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: 'now-alt-bold', textAlign: 'right', marginLeft: 36}}>From:</Text>
              <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: 'now-alt-regular', textAlign: 'right', marginLeft: 5}}>{to}</Text>
            </View>
            <TextInput
              style={{color: '#FFFFFF', fontSize: 14, fontFamily: 'now-alt-regular', textAlign: 'left', marginLeft: 5, marginTop: 20, alignSelf: 'center', width: calculateWidthRatio(295)}}
              // onSubmitEditing={Keyboard.dismiss}
              value={this.state && this.state.text}
              onChangeText={(value) => this.handleChange(value)} /* needs test */
              label='Description'
              placeholder={'Enter Description...'}
              placeholderTextColor='#DEDEDE'
              autofocus
              keyboardAppearance={'dark'}
            />
          </View>
          <KeyboardAvoidingView style={{height: calculateHeightRatio(56)}}>
            <TouchableHighlight onPress={() => {
              this.props.requestPayment(wallet, to, amount)
              this.props.navigation.navigate('Home')
            }}>
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
const mapDispatchToProps = (dispatch) => {
  return {
    requestPayment: (selectedWallet, destination, amount) => dispatch(requestPayment(selectedWallet, destination, amount))
  }
}

export default connect(null, mapDispatchToProps)(RequestConfirm)
