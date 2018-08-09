import React from 'react'
import { Text, View, Image, TextInput } from 'react-native'
import { SegmentedControl } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, textColorMain, lightBackground, darkBackground, mediumBackground, mediumLightBackground } from 'circles-mobile/lib/styles/styles'
import ActionButtons from 'circles-mobile/lib/components/Buttons/actionButtons'

class SearchScreen extends React.Component {
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
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'row', width: calculateWidthRatio(315), height: calculateHeightRatio(43)}}>
              <TextInput style={{width: calculateWidthRatio(285), height: calculateHeightRatio(43), backgroundColor: darkBackground, borderBottomLeftRadius: 6, borderTopLeftRadius: 6, marginBottom: 10, padding: 14}}>
                <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: '#686868', marginLeft: 14, paddingLeft: 14}}>Search</Text>
              </TextInput>
              <View style={{width: calculateWidthRatio(30), height: calculateHeightRatio(43), backgroundColor: darkBackground, borderTopRightRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: calculateWidthRatio(14), height: calculateHeightRatio(13), resizeMode: 'contain'}} source={require('circles-mobile/images/search.png')} />
              </View>
            </View>
          </View>
          <SegmentedControl
            values={['Individuals', 'Organizations']}
            tintColor={primary}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{flex: 0.53}}>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: '#9B9B9B', textAlign: 'center', marginTop: 25}}>
            Search for names phone numbers, vendors, and locations
          </Text>
        </View>
        <View style={{flex: 0.17, backgroundColor: lightBackground}}>
          <Text style={{fontFamily: 'now-alt-regular', fontSize: 12, color: textColorMain, marginLeft: 23, marginRight: 23, marginTop: 20}}>
            Connect with people in your network that you trust to spend your circles
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
            <Text style={{fontFamily: 'now-alt-bold', color: textColorMain}}>
              Skip
            </Text>
          </View>
        </View>
        <ActionButtons navigation={this.props.navigation} />
      </View>
    )
  }
}
// {
//   this.state.controlIndex
//   ? <ScrollView contentContainerStyle={{alignItems: 'center'}}>
//     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35, maxWidth: calculateWidthRatio(326), height: calculateHeightRatio(76), backgroundColor: mediumLightBackground, borderRadius: 7}}>
//       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
//         <Image style={{width: calculateWidthRatio(30), height: calculateHeightRatio(30), resizeMode: 'contain', marginLeft: 10}} source={require('circles-mobile/images/logo.png')} />
//         <Text style={{marginLeft: 20, marginRight: 10, fontSize: 14, fontFamily: 'now-alt-regular', color: 'white'}}>Yarn, Inc. has sent you a trust request!</Text>
//       </View>
//     </View>
//     <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35, maxWidth: calculateWidthRatio(326), height: calculateHeightRatio(76), backgroundColor: mediumLightBackground, borderRadius: 7}}>
//       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20}}>
//         <Image style={{width: calculateWidthRatio(30), height: calculateHeightRatio(30), resizeMode: 'contain', marginLeft: 10}} source={require('circles-mobile/images/logo.png')} />
//         <Text style={{marginLeft: 20, marginRight: 10, fontSize: 14, fontFamily: 'now-alt-regular', color: 'white'}}>Saraswathi Subbaraman has sent you a trust request!</Text>
//       </View>
//     </View>
//     {/* <Text style={{fontSize: 12, fontFamily: 'now-alt-regular', color: 'white', marginTop: 30}}>You have been issued your first Circles basic income!</Text> */}
//   </ScrollView>
//   : <FlatList
//     data={[{key: 'a', value: 1000}, {key: 'b', value: 500}]}
//     renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: calculateHeightRatio(52), borderBottomWidth: 1, borderColor: 'rgba(58, 59, 78, 49)'}}>
//       <Image style={{width: calculateWidthRatio(29), height: calculateHeightRatio(29), marginLeft: 27, resizeMode: 'contain'}} source={require('circles-mobile/images/userIcon.png')} />
//       <Text style={{marginLeft: 19, fontSize: 12, fontFamily: 'now-alt-regular', color: '#CECECE'}}>{`You received ${item.value} CCS`}</Text>
//     </View>}
//   />
// }
export default SearchScreen
