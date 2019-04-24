import React from 'react'
import { connect } from 'react-redux'
import { Dimensions, Text, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background3, background5, fonts } from 'circles-mobile/lib/styles'

const Header = (props) => (
  <View style={{
    borderRadius: 3,
    backgroundColor: background3,
    width: calculateWidthRatio(346),
    height: calculateHeightRatio(32),
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 10,
    alignSelf: 'center'
  }}>
    <Text style={{fontFamily: fonts.boldText, fontSize: 16, color: '#FFFFFF', marginLeft: 7}}>
      {props.title}
    </Text>
  </View>
)

const Entry = (props) => (
  <View style={[{height: calculateHeightRatio(60), width: calculateWidthRatio(247)}, props.style]}>
    <Text style={{fontFamily: fonts.secondaryText, fontSize: 16, color: '#FFFFFF'}}>{props.heading}</Text>
    <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: '#9B9B9B', marginTop: 8}}>{props.name}</Text>
  </View>
)

const Admin = (props) => (
  <View style={{marginLeft: calculateWidthRatio(56), height: calculateHeightRatio(40), justifyContent: 'center'}}>
    <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: '#9B9B9B'}}>{props.name}</Text>
  </View>
)

const OrgWalletSettings = (props) => (
  <View style={{flex: 1, backgroundColor: background5}}>
    <View
      style={{
        height: calculateHeightRatio(108),
        alignItems: 'center',
        backgroundColor: background3,
        shadowOffset: {width: 0, height: 4},
        shadowColor: 'rgba(7, 7, 7, 0.5)',
        shadowOpacity: 0.2
      }}>
      <View
        style={{
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 20
        }}>
        <TouchableHighlight
          style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10}}
          onPress={() => {
            props.navigation.goBack()
          }}
        >
          <View style={{flexDirection: 'row', marginLeft: 15, alignItems: 'center'}}>
            <Image
              style={{width: calculateWidthRatio(10), height: calculateHeightRatio(18), resizeMode: 'contain'}}
              source={require('circles-mobile/images/arrowLeft.png')}
            />
            <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 10}}>{translate('Back')}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={{alignItems: 'center', justifyContent: 'center', height: 20, marginTop: 10}}
          onPress={() => { return true }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
            <Text style={{fontFamily: fonts.primaryText, color: 'white', marginRight: 10}}>{translate('Edit')}</Text>
            <Image
              style={{width: calculateWidthRatio(23), height: calculateHeightRatio(21), resizeMode: 'contain'}}
              source={require('circles-mobile/images/editing.png')}
            />
          </View>
        </TouchableHighlight>
      </View>
      <Text style={{fontFamily: fonts.boldText, fontSize: 20, color: 'white', textAlign: 'center'}}>{translate('Settings')}</Text>
    </View>
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{alignItems: 'center'}}>
        <Header title={'Wallet Details'} />
        <Entry heading={'Name'} name={props.user.selectedWallet} style={{marginTop: 10}} />
        <Entry heading={'Category'} name={'Clothing'} />
        <Entry heading={'Location'} name={'Hamburg, Germany'} />
        <Entry heading={'Description'} name={'Knitted socks for all!'} />
      </View>
      <View style={{alignItems: 'flex-start'}}>
        <Header title={'Administrators'} />
        <ScrollView>
          <Admin name={'Ashoka Finley'} />
          <Admin name={'Carolyn Reckhow'} />
          <Admin name={'Ariana Freitag'} />
        </ScrollView>
      </View>
      <View style={{minHeight: calculateHeightRatio(56)}} />
      {/* <TouchableHighlight onPress={() => props.navigation.navigate('WalletView')}>
        <View style={{
          height: calculateHeightRatio(56),
          justifyContent: 'center',
          backgroundColor: primary,
          width: calculateWidthRatio(375)
        }}>
          <Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'center', fontFamily: fonts.secondaryText}}>
            ADD TO CONTACTS
          </Text>
        </View>
      </TouchableHighlight> */}
    </View>
  </View>
)
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(OrgWalletSettings)
