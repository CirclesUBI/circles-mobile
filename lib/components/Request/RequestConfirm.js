import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, TextInput, TouchableHighlight, KeyboardAvoidingView } from 'react-native'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, fonts } from 'circles-mobile/lib/styles'
import { requestPayment } from 'circles-mobile/lib/actions/WalletActions'

class RequestConfirm extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      text: ''
    }
    this.translate = translate
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
            <Text style={{fontFamily: fonts.boldText, fontSize: 20, color: 'white', marginTop: calculateHeightRatio(50)}}>{wallet}</Text>
            <Text style={{fontFamily: fonts.primaryText, fontSize: 20, color: '#5D5D6A', marginTop: calculateHeightRatio(10)}}>{this.translate('Requests')}</Text>
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
              <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: fonts.boldText, textAlign: 'right', marginLeft: 36}}>From:</Text>
              <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: fonts.primaryText, textAlign: 'right', marginLeft: 5}}>{to}</Text>
            </View>
            <TextInput
              style={{color: '#FFFFFF', fontSize: 14, fontFamily: fonts.primaryText, textAlign: 'left', marginLeft: 5, marginTop: 20, alignSelf: 'center', width: calculateWidthRatio(295)}}
              // onSubmitEditing={Keyboard.dismiss}
              value={this.state && this.state.text}
              onChangeText={(value) => this.handleChange(value)} /* needs test */
              label={this.translate('Description')}
              placeholder={this.translate('Enter Description...')}
              placeholderTextColor='#DEDEDE'
              autofocus
              keyboardAppearance={'dark'}
            />
          </View>
          <KeyboardAvoidingView style={{height: calculateHeightRatio(56)}}>
            <TouchableHighlight onPress={() => {
              this.props.requestPayment(wallet, to, amount, JSON.stringify(Date.now()))
              this.props.navigation.navigate('Home')
            }}>
              <View style={{height: calculateHeightRatio(56), justifyContent: 'center', backgroundColor: primary, width: calculateWidthRatio(375)}}>
                <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center', fontFamily: fonts.primaryText}}>
                  {this.translate('REQUEST')}
                </Text>
              </View>
            </TouchableHighlight>
          </KeyboardAvoidingView>
        </View>
      </View>
    )
  }
}

RequestConfirm.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPayment: (selectedWallet, destination, amount) => dispatch(requestPayment(selectedWallet, destination, amount))
  }
}

export default connect(null, mapDispatchToProps)(RequestConfirm)
