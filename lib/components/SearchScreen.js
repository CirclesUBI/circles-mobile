import React from 'react'
import { FlatList, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors, heightRatio, widthRatio } from 'circles/lib/styles/globalStyles'
import Contacts from 'react-native-contacts'
import CheckBox from 'react-native-check-box'
import { Navigation } from 'react-native-navigation'

class LookupScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor () {
    super()
    this.state = {
      value: '',
      contacts: []
    }
    this.updateValue = this.updateValue.bind(this)
    this.getContacts = this.getContacts.bind(this)
  }
  updateValue (value) {
    this.setState({value})
  }
  getLocation () {
    navigator.geolocation.getCurrentPosition((location) => console.log(location))
  }
  getContacts () {
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
        console.error('denied')
      } else {
        // contacts returned in []
        this.setState({contacts})
      }
    })
  }
  _keyExtractor = (item, index) => index;
  componentDidMount () {
    this.getLocation()
  }
  render () {
    console.log(this.state.contacts)
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: colors.lightBlue}}>
        <View style={{width: widthRatio(375), height: heightRatio(160), alignItems: 'center', backgroundColor: colors.darkBlue}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: heightRatio(40), width: widthRatio(315)}}>
            <TextInput
              style={{height: heightRatio(40), width: widthRatio(265), borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff'}}
              onChangeText={(value) => this.setState({value})}
              value={this.state.value}
              keyboardType={'default'}
              placeholder={'Search'}
            />
            <TouchableOpacity onPress={() => Navigation.push({
              screen: 'LookupScreen',
              navigatorStyle: {
                navBarHidden: true
              }
            })}>
              <Icon
                name='ios-search-outline'
                style={{fontSize: 40}}
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: colors.lightGrey, fontSize: 14, fontFamily: 'avenir', width: widthRatio(325), marginTop: heightRatio(20)}}>
            Search for names, phone numbers, vendors, and locations.
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          { this.state.contacts.length === 0
            ? <TouchableHighlight style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            shadowOffset: {width: 0, height: 4},
            shadowColor: 'rgba(7, 7, 7, 0.5)',
            shadowOpacity: 0.2,
            backgroundColor: '#ffffff',
            width: widthRatio(274),
            height: heightRatio(40),
            // elevation: 5
            }}
              onPress={this.getContacts}
            >
              <Text style={{color: colors.lightBlue }}>
                + Invite your friends to Circles
              </Text>
            </TouchableHighlight>
            : null
          }
          { this.state.contacts.length !== 0
            ? <FlatList
              data={this.state.contacts}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) =>
                <View key={item.key} style={{height: heightRatio(60), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderBottomWidth: 1, width: widthRatio(355), borderColor: '#C0C0C0'}}>
                  <Text style={{flex: 1}}>
                    {`${item.givenName} ${item.familyName}`}
                  </Text>
                  <CheckBox
                    style={{flex: 1, padding: 10, maxWidth: widthRatio(40)}}
                    onClick={()=>{}}
                    isChecked={true}
                    // leftText={leftText}
                  />
                </View>}
              style={{flex: 1, width: widthRatio(375), backgroundColor: 'white'}}
              contentContainerStyle={{alignItems: 'center'}}
            />
            : null
          }
          {/* {
            this.state.contacts.map((value, i) => {

            })
          } */}
        </View>
      </View>
    )
  }
}

export default LookupScreen
