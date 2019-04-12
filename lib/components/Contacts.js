import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, FlatList, TouchableHighlight } from 'react-native'
import { Contacts, Permissions, Linking } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { background3, background5, fonts, textColor4, tertiary } from 'circles-mobile/lib/styles'
import * as _ from 'lodash'

const ListItem = ({item, pressFunction}) =>
  <View key={item.key} style={{width: calculateWidthRatio(338), borderBottomWidth: 1, borderColor: background3, alignItems: 'center'}}>
    <View style={{height: calculateHeightRatio(49), width: calculateWidthRatio(318), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={{color: 'white', fontFamily: fonts.primaryText, fontSize: 14}}>
        {`${item.name}`}
      </Text>
      <TouchableHighlight onPress={() => pressFunction(item.phoneNumbers[0].number)} disabled={typeof item.phoneNumbers[0] === 'undefined'}>
        <View
          style={{
            width: calculateWidthRatio(87),
            height: calculateHeightRatio(35),
            backgroundColor: typeof item.phoneNumbers[0] === 'undefined' ? textColor4 : tertiary,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{color: 'white', fontFamily: fonts.secondaryText, fontSize: 12}}>
            {typeof item.phoneNumbers[0] === 'undefined'
              ? 'N/A'
              : 'Select'}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>

class ContactsScreen extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      text: '',
      contacts: [],
      size: 100
    }
    this.translate = translate
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (value) {
    this.setState({text: value, contacts: value ? _.filter(this.state.saveContacts, (i) => i.name.toLowerCase().indexOf(value.toLowerCase()) > -1) : this.state.saveContacts})
  }

  _keyExtractor (item, index) {
    return index + ''
  }
  async fetchContactsAsync (number = 0) {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS)
    if (permission.status !== 'granted') {
      // Permission was denied...
      return
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS
      ],
      pageSize: this.state.size + number
      // pageOffset: 0
    })
    if (contacts.total > 0) {
      this.setState({contacts: contacts.data, saveContacts: contacts.data, size: this.state.size += number})
    }
  }
  componentWillMount () {
    this.fetchContactsAsync()
  }
  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#161724'}}>
        <NavBar navFunction={() => this.props.navigation.goBack()} />
        <View style={{
          height: calculateWidthRatio(53),
          width: calculateWidthRatio(375),
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 20,
          flexDirection: 'row',
          backgroundColor: background5
        }}>
          <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: fonts.boldText, textAlign: 'right', marginLeft: 36}}>{this.translate('To')}:</Text>
          <TextInput
            style={{color: '#FFFFFF', fontSize: 14, fontFamily: fonts.primaryText, textAlign: 'right', marginLeft: 5, marginTop: 2}}
            // onSubmitEditing={Keyboard.dismiss}
            value={this.state && this.state.text}
            onChangeText={(value) => this.handleChange(value)} /* needs test */
            label={this.translate('Contact Name')}
            placeholder={this.translate('Add Name or SMS')}
            placeholderTextColor='#DEDEDE'
            autofocus
            keyboardAppearance={'dark'}
          />

        </View>
        <FlatList
          data={this.state.contacts}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => <ListItem item={item}
            pressFunction={
              (number) => {
                if (this.props.navigation.state.params) {
                  this.props.navigation.navigate(this.props.navigation.state.params.screen, {to: item.name, wallet: this.props.navigation.state.params.wallet, amount: this.props.navigation.state.params.amount})
                } else {
                  const smsString = this.translate("I'm inviting you to join me on the circles platform")
                  Linking.openURL('sms:+' + number + '&body=' + smsString)
                }
              }
            } />}
          style={{flex: 1, width: calculateWidthRatio(338), borderTopWidth: 1, borderColor: '#272838', alignSelf: 'center', marginTop: 20}}
          contentContainerStyle={{alignItems: 'center'}}
          onEndReached={() => this.state.text ? true : this.fetchContactsAsync(100)}
        />
      </View>
    )
  }
}

ContactsScreen.contextTypes = {
  t: PropTypes.func.isRequired
}

export default ContactsScreen
