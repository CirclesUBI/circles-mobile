import React from 'react'
import { Dimensions, Text, TouchableHighlight, View } from 'react-native'
import { Card, Flex } from 'antd-mobile-rn'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'

class OrgWalletScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'grey'}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginLeft: 15, marginRight: 15}}>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, width: 30}} onPress={() => {
              this.props.navigation.goBack()
            }}>
              <EvilIcons style={{alignSelf: 'center'}} name='close' size={30} color='black' />
            </TouchableHighlight>
            <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', height: 30, width: 30}} onPress={() => {
              this.props.navigation.navigate('OrgWalletSettings')
            }}>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='settings' size={30} color='black' />
            </TouchableHighlight>
          </View>
          <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{textAlign: 'center'}}>Knitted Socks Org</Text>
            <Text style={{textAlign: 'center'}}>Account Value: 20,000 CCS</Text>
          </View>
        </View>
        <View style={{flex: 2, backgroundColor: 'yellow'}}>
          {/* <Text style={{textAlign: 'center'}}>Your next Circles issuance is due in 7 Days</Text>
          <Card style={{flex: 1, margin: 5, width: Dimensions.get('window').width - 10}}>
            <Card.Header
              title='This is title'
              thumb='https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg'
              // extra={<span>this is extra</span>}
            />
            <Card.Body>
              <Text>
                Omg this is amazing
              </Text>
            </Card.Body>
            <Card.Footer content='footer content' extra={<Text>Hello</Text>} />
          </Card> */}
        </View>
        <View style={{flex: 1, backgroundColor: 'blue'}}>
          {/* <Text style={{textAlign: 'center'}}>Connect with people in your network that you trust to spend your circles</Text> */}
        </View>
        <View style={{flexDirection: 'row', height: 60}}>
          {/* <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRightWidth: 1}} onPress={() => {
            this.props.navigation.navigate('Contacts')
          }}>
            <Text>Add Contacts</Text>
          </TouchableHighlight>
          <TouchableHighlight style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}} onPress={() => {
            this.props.navigation.navigate('Validate')
          }}>
            <Text>Get Validated</Text>
          </TouchableHighlight> */}
        </View>

      </View>
    )
  }
}

export default OrgWalletScreen
