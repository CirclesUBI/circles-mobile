import React from 'react'
import { View, Text, TextInput, FlatList, TouchableHighlight } from 'react-native'
import { Contacts, Permissions, Linking } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { darkBackground } from 'circles-mobile/lib/styles/styles'

const ListItem = ({item, pressFunction}) =>
  <View key={item.key} style={{width: calculateWidthRatio(338), borderBottomWidth: 1, borderColor: '#272838', alignItems: 'center'}}>
    <View style={{height: calculateHeightRatio(49), width: calculateWidthRatio(318), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={{color: 'white', fontFamily: 'now-alt-regular', fontSize: 14}}>
        {`${item.name}`}
      </Text>
      <TouchableHighlight onPress={() => pressFunction(item.phoneNumbers[0].number)}>
        <View style={{width: calculateWidthRatio(87), height: calculateHeightRatio(35), backgroundColor: '#48B1B8', borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontFamily: 'now-alt-medium', fontSize: 12}}>Select</Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>

class ContactsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      // contacts: [{givenName: 'Ed', familyName: 'Zillion'}, {givenName: 'Saraswathi', familyName: 'Subbaraman'}, {givenName: 'Martin', familyName: 'Lundfall'}]
      contacts: []
    }
    this.handleChange = this.handleChange.bind(this)
    // this.getContacts = this.getContacts.bind(this)
  }
  handleChange (value) {
    this.setState({text: value})
    // this.props.clearMessage()
  }

  _keyExtractor (item, index) {
    return index + ''
  }
  async fetchContactsAsync () {
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
      // pageSize: 0,
      // pageOffset: 0
    })
    if (contacts.total > 0) {
      this.setState({contacts: contacts.data})
  //     Alert.alert(
  //       'Your first contact is...',
  //       `Name: ${contacts.data[0].name}
  // ` +
  //       `Phone numbers: ${JSON.stringify(contacts.data[0].phoneNumbers)}
  // ` +
  //       `Emails: ${JSON.stringify(contacts.data[0].emails)}`
  //     );
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
          backgroundColor: darkBackground
        }}>
          <Text style={{color: '#DEDEDE', fontSize: 14, fontFamily: 'now-alt-bold', textAlign: 'right', marginLeft: 36}}>To:</Text>
          <TextInput
            style={{color: '#FFFFFF', fontSize: 14, fontFamily: 'now-alt-regular', textAlign: 'right', marginLeft: 5, marginTop: 2}}
            // onSubmitEditing={Keyboard.dismiss}
            value={this.state && this.state.text}
            onChangeText={(value) => this.handleChange(value)} /* needs test */
            label='Contact Name'
            placeholder={'Add Name or SMS'}
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
              (number) => this.props.navigation.state.params
              ? this.props.navigation.navigate(this.props.navigation.state.params.screen)
              : Linking.openURL('sms:+' + number + '&body=I\'m inviting you to join me on the circles platform')
            } />}
          style={{flex: 1, width: calculateWidthRatio(338), borderTopWidth: 1, borderColor: '#272838', alignSelf: 'center', marginTop: 20}}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </View>
    )
  }
}

export default ContactsScreen
