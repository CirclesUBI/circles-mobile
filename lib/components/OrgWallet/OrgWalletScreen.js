import React from 'react'
import { Dimensions, Text, TouchableHighlight, View, TouchableWithoutFeedback, Image, FlatList } from 'react-native'
import { Card, Flex, SegmentedControl } from 'antd-mobile-rn'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, secondary, textColorMain, lightBackground, darkBackground } from 'circles-mobile/lib/styles/styles'

class OrgWalletScreen extends React.Component {

  constructor (props) {
    super(props)
    this.handleSegmentControl = this.handleSegmentControl.bind(this)
    this.state = {
      controlIndex: typeof props.navigation.state.params !== 'undefined' ? props.navigation.state.params.controlIndex : 0
    }
  }

  handleSegmentControl (e) {
    this.setState({
      controlIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#161724'}}>
        <View style={{flex: 0.22, backgroundColor: '#232436', shadowColor: '#000000', shadowOffset: {width: 0, height: 3}}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginLeft: 23, marginRight: 23}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 35}} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35)}} source={require('circles-mobile/images/close.png')} />
            </TouchableHighlight>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'now-alt-bold'}}>Knitted Socks Org</Text>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 35}} onPress={() => {
              this.props.navigation.navigate('OrgWalletSettings')
            }}>
              <Image style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35)}} source={require('circles-mobile/images/settings.png')} />
            </TouchableHighlight>
          </View>
          <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontFamily: 'now-alt-regular', fontSize: 12, color: '#CECECE'}}>Account Value: 20000 CCS</Text>
          <SegmentedControl
            values={['Transactions', 'Notifications']}
            tintColor={'#53C894'}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{flex: 0.08, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 14, color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginLeft: 21}}>SHORTCUTS</Text>
          <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(22), marginLeft: 11}} source={require('circles-mobile/images/add.png')} />
        </View>

        <View style={{flex: 0.45}}>
          {/* {
            this.state.controlIndex
            ? <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
                <Image style={{width: calculateWidthRatio(37), height: calculateHeightRatio(37)}} source={require('circles-mobile/images/circlesDistribution.png')} />
                <Text style={{marginLeft: 16, fontSize: 16, fontFamily: 'now-alt-bold', color: 'white'}}>You received 1000 CCS</Text>
              </View>
              <Text style={{fontSize: 12, fontFamily: 'now-alt-regular', color: 'white', marginTop: 30}}>You have been issued your first Circles basic income!</Text>
            </View>
            : <FlatList
              data={[{key: 'a', value: 1000}, {key: 'b', value: 500}]}
              renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: calculateHeightRatio(52), borderBottomWidth: 1, borderColor: 'rgba(58, 59, 78, 49)'}}>
                <Image style={{width: calculateWidthRatio(26), height: calculateHeightRatio(26), marginLeft: 27}} source={require('circles-mobile/images/circlesDistribution.png')} />
                <Text style={{marginLeft: 19, fontSize: 12, fontFamily: 'now-alt-regular', color: '#CECECE'}}>{`You received ${item.value} CCS`}</Text>
              </View>}
            />
          } */}
          <View style={{backgroundColor: darkBackground, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'now-alt-regular', fontSize: 12, marginLeft: 12}}>Trading in Person?</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'now-alt-bold', fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
              You have no inventory shortcuts!
            </Text>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
              Tap to create a tag for things you exchange for Circles regularly.
            </Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('OrgInventory')}>
              <Image style={{height: calculateHeightRatio(21), width: calculateWidthRatio(21), marginTop: 11}} source={require('circles-mobile/images/add.png')} />
            </TouchableHighlight>
          </View>
          <View style={{marginTop: 16, backgroundColor: darkBackground, width: calculateWidthRatio(345), height: calculateHeightRatio(39), borderRadius: 6, justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'white', fontFamily: 'now-alt-regular', fontSize: 12, marginLeft: 12}}>Trading online?</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'now-alt-bold', fontSize: 16, width: calculateWidthRatio(303), color: 'white', marginTop: 25}}>
              Add Your Circles Address Online
            </Text>
            <Text style={{fontFamily: 'now-alt-regular', fontSize: 20, width: calculateWidthRatio(303), color: '#9B9B9B', marginTop: 5}}>
              Tap to copy your Circles address and add it to eBay, Etsy, Instagram, or anywhere online!
            </Text>
          </View>
        </View>
        {/* <View style={{flex: 0.17, backgroundColor: lightBackground}}>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: textColorMain, marginLeft: 23, marginRight: 23, marginTop: 20}}>
            Connect with people in your network that you trust to spend your circles
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
            <Text style={{fontFamily: 'now-alt-bold', color: textColorMain}}>
              Skip
            </Text>
          </View>
        </View> */}
        {/* <ActionButtons navigation={this.props.navigation} /> */}
      </View>
    )
  }
}

export default OrgWalletScreen

// {/* <View style={{flex: 1}}>
//   <View style={{flex: 1, backgroundColor: 'grey'}}>
//     <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginLeft: 15, marginRight: 15}}>
//       <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, width: 30}} onPress={() => {
//         this.props.navigation.goBack()
//       }}>
//         <EvilIcons style={{alignSelf: 'center'}} name='close' size={30} color='black' />
//       </TouchableHighlight>
//       <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, width: 30}} onPress={() => {
//         this.props.navigation.navigate('OrgWalletSettings')
//       }}>
//         <SimpleLineIcons style={{alignSelf: 'center'}} name='settings' size={30} color='black' />
//       </TouchableHighlight>
//     </View>
//     <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//       <Text style={{textAlign: 'center'}}>Knitted Socks Org</Text>
//       <Text style={{textAlign: 'center'}}>Account Value: 20,000 CCS</Text>
//     </View>
//     <SegmentedControl
//       values={['Transactions', 'Notifications']}
//       tintColor={'#000000'}
//       style={{margin: 15, marginBottom: 15, height: 30}}
//     />
//   </View>
//   <View style={{flex: 2, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center'}}>
//     <TouchableWithoutFeedback style={{alignItems: 'center', justifyContent: 'center'}} onPress={() => {
//       this.props.navigation.navigate('OrgInventory')
//     }}>
//       <View>
//         <Text>Add Inventory</Text>
//         <SimpleLineIcons style={{alignSelf: 'center'}} name='plus' size={16} color='black' />
//       </View>
//     </TouchableWithoutFeedback>
//     {/* <Text style={{textAlign: 'center'}}>Your next Circles issuance is due in 7 Days</Text>
//     <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
//       <Card.Header
//         title='This is title'
//         thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
//         // extra={<span>this is extra</span>}
//       />
//       <Card.Body>
//         <Text>
//           Omg this is amazing
//         </Text>
//       </Card.Body>
//       <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
//     </Card> */}
//   </View>
//   <View style={{flex: 1, backgroundColor: 'blue'}}>
//     {/* <Text style={{textAlign: 'center'}}>Connect with people in your network that you trust to spend your circles</Text> */}
//   </View>
//   <View style={{flexDirection: 'row', height: 60}}>
//     {/* <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRightWidth: 1}} onPress={() => {
//       this.props.navigation.navigate('Contacts')
//     }}>
//       <Text>Add Contacts</Text>
//     </TouchableHighlight>
//     <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}} onPress={() => {
//       this.props.navigation.navigate('Validate')
//     }}>
//       <Text>Get Validated</Text>
//     </TouchableHighlight> */}
//   </View>
//
// </View> */}
