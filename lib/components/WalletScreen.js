import React from 'react'
import { Dimensions, Text, TouchableHighlight, View, Image, StyleSheet, FlatList} from 'react-native'
import { Card, Flex, Button, SegmentedControl } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, secondary, textColorMain, lightBackground, height } from 'circles-mobile/lib/styles/styles'

const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: 'now-alt-bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 14
  },
  actionButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'now-alt-medium',
    fontSize: 14,
    color: textColorMain
  }
})

const ActionButtons = (props) =>
  (<View style={{flexDirection: 'row', flex: 0.08}}>
    <TouchableHighlight style={[styles.actionButtons, {backgroundColor: primary, borderRightWidth: 1}]} onPress={() => {
      props.navigation.navigate('Contacts')
    }}>
      <Text style={styles.buttonText}>ADD TO CONTACTS</Text>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.actionButtons, {backgroundColor: secondary}]} onPress={() => {
      props.navigation.navigate('Validate')
    }}>
      <Text style={styles.buttonText}>GET VALIDATED</Text>
    </TouchableHighlight>
  </View>)

class WalletScreen extends React.Component {
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
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'now-alt-bold'}}>Ashoka Finley</Text>
            <View style={{minHeight: calculateHeightRatio(35), minWidth: calculateWidthRatio(35)}} />
          </View>
          <Text style={{textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontFamily: 'now-alt-regular', fontSize: 12, color: '#CECECE'}}>Account Value: 1000 CCS</Text>
          <SegmentedControl
            values={['Transactions', 'Notifications']}
            tintColor={'#53C894'}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{flex: 0.08, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgba(58, 59, 78, 0.49)'}}>
          <Text style={{textAlign: 'center', fontFamily: 'now-alt-regular', fontSize: 12, color: '#CECECE'}}>Your next Circles issuance is due 10/24/18</Text>
        </View>

        <View style={{flex: 0.45}}>
          {
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
          }
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

export default WalletScreen
