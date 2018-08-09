import React from 'react'
import { connect } from 'react-redux'
import { Text, TouchableHighlight, View, Image, FlatList, ScrollView } from 'react-native'
import { SegmentedControl } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, mediumBackground, mediumLightBackground } from 'circles-mobile/lib/styles/styles'
import { numberWithCommas } from 'circles-mobile/lib/utilities'

class OrgWalletScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleSegmentControl = this.handleSegmentControl.bind(this)
    this.state = {
      controlIndex: typeof props.navigation.state.params !== 'undefined' ? props.navigation.state.params.controlIndex : 0,
      walletName: 'Knitted Socks Org'
    }
  }

  handleSegmentControl (e) {
    this.setState({
      controlIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: mediumBackground}}>
        <View style={{flex: 0.22, backgroundColor: mediumLightBackground, shadowColor: '#000000', shadowOffset: {width: 0, height: 3}}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginLeft: 23, marginRight: 23}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 35}} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35), resizeMode: 'contain'}} source={require('circles-mobile/images/close.png')} />
            </TouchableHighlight>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'now-alt-bold'}}>{this.props.user.selectedOrgWallet}</Text>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 35}} onPress={() => {
              this.props.navigation.navigate('OrgWalletSettings')
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35), resizeMode: 'contain'}} source={require('circles-mobile/images/settings.png')} />
            </TouchableHighlight>
          </View>
          <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontFamily: 'now-alt-regular', fontSize: 12, color: '#CECECE', marginBottom: 10}}>
            {`Account Value: ${numberWithCommas(this.props.wallets[this.props.user.selectedOrgWallet].balance)} CCS`}
          </Text>
          <SegmentedControl
            values={['Transactions', 'Notifications']}
            tintColor={primary}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{flex: 0.45}}>
          {
            this.state.controlIndex
            ? <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35, maxWidth: calculateWidthRatio(326), height: calculateHeightRatio(76), backgroundColor: mediumLightBackground, borderRadius: 7}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                  <Image style={{width: calculateWidthRatio(30), height: calculateHeightRatio(30), resizeMode: 'contain', marginLeft: 10}} source={require('circles-mobile/images/logo.png')} />
                  <Text style={{marginLeft: 20, marginRight: 10, fontSize: 14, fontFamily: 'now-alt-regular', color: 'white'}}>Yarn, Inc. has sent you a trust request!</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35, maxWidth: calculateWidthRatio(326), height: calculateHeightRatio(76), backgroundColor: mediumLightBackground, borderRadius: 7}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                  <Image style={{width: calculateWidthRatio(30), height: calculateHeightRatio(30), resizeMode: 'contain', marginLeft: 10}} source={require('circles-mobile/images/logo.png')} />
                  <Text style={{marginLeft: 20, marginRight: 10, fontSize: 14, fontFamily: 'now-alt-regular', color: 'white'}}>Saraswathi Subbaraman has sent you a trust request!</Text>
                </View>
              </View>
              {/* <Text style={{fontSize: 12, fontFamily: 'now-alt-regular', color: 'white', marginTop: 30}}>You have been issued your first Circles basic income!</Text> */}
            </ScrollView>
            : <FlatList
              data={[{key: 'a', value: 1000}, {key: 'b', value: 500}]}
              renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: calculateHeightRatio(52), borderBottomWidth: 1, borderColor: 'rgba(58, 59, 78, 49)'}}>
                <Image style={{width: calculateWidthRatio(29), height: calculateHeightRatio(29), marginLeft: 27, resizeMode: 'contain'}} source={require('circles-mobile/images/userIcon.png')} />
                <Text style={{marginLeft: 19, fontSize: 12, fontFamily: 'now-alt-regular', color: '#CECECE'}}>{`You received ${item.value} CCS`}</Text>
              </View>}
            />
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    wallets: state.wallets
  }
}

export default connect(mapStateToProps)(OrgWalletScreen)
