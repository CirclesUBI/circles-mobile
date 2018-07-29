import React from 'react'
import { Text, View, TouchableWithoutFeedback, Dimensions, StyleSheet, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo'
import { List } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu'
const { Popover } = renderers
const styles = StyleSheet.create({
  anchorStyle: {
    marginRight: 7,
    backgroundColor: '#242437'
  }
})

const AccountsListView = (props) => {
  return (
    <View style={{backgroundColor: '#242437', marginLeft: -5, marginRight: -5, marginTop: -5, height: calculateHeightRatio(150)}}>
      <View style={{backgroundColor: '#242437', height: 60, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgba(58,59,78, 49)'}}>
        <Text style={{color: 'white', fontSize: 18, fontFamily: 'now-alt-bold', textAlign: 'center'}}>Select Wallet</Text>
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => {
          props.close()
          props.pay ? props.navigator.navigate('PayAmount') : props.navigator.navigate('RequestAmount')
        }}>
          <View style={{height: calculateHeightRatio(45), alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgba(58,59,78, 49)'}}>
            <Text style={{fontFamily: 'now-alt-regular', color: '#CBCBCB', fontSize: 14}}>
              Ashoka Finley
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          props.close()
          props.pay ? props.navigator.navigate('PayAmount') : props.navigator.navigate('RequestAmount')
        }}>
          <View style={{height: calculateHeightRatio(45), alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'now-alt-regular', color: '#CBCBCB', fontSize: 14}}>
              Knitted Socks Org
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>

  )
}
class Tabs extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      opened: false,
      lists: false,
      pay: false,
      request: false
    }
    this.switchView = this.switchView.bind(this)
    this.onBackdropPress = this.onBackdropPress.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect (option) {
    this.setState({[option]: !this.state.option})
  }

  onTriggerPress () {
    this.setState({opened: !this.state.opened})
  }

  onBackdropPress () {
    this.setState({ opened: false, lists: false, pay: false, request: false })
  }

  switchView (option) {
    this.setState({lists: !this.state.lists, [option]: !this.state.option})
    return false
  }

  render () {
    const { opened } = this.state
    return (
      <View style={{height: 60, flexDirection: 'row', justifyContent: 'space-around'}}>
        <LinearGradient
          colors={['#232436', '#151520']}
          style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}
        >
          <View style={{height: 60, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
              <View>
                <Image style={{height: calculateHeightRatio(28), width: calculateWidthRatio(31)}} source={require('circles-mobile/images/home.png')} />
                {/* <Text>Home</Text> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{height: 60, flexDirection: 'column', justifyContent: 'center'}}>
            <Menu
              renderer={Popover}
              rendererProps={{anchorStyle: styles.anchorStyle}}
              opened={opened}
              onBackdropPress={() => this.onBackdropPress()}
            >
              <MenuTrigger onPress={() => this.onTriggerPress()}>
                <Image style={{height: calculateHeightRatio(32), width: calculateWidthRatio(30)}} source={require('circles-mobile/images/calculator.png')} />
                {/* <SimpleLineIcons style={{alignSelf: 'center'}} name='calculator' size={32} color='gray' /> */}
                {/* <Text>Transact</Text> */}
              </MenuTrigger>
              <MenuOptions customStyles={{optionsContainer: {width: Dimensions.get('window').width, marginLeft: 8, height: calculateHeightRatio(150), padding: 0, margin: 0}}}>
                <MenuOption customStyles={{optionWrapper: {margin: 0}}} onSelect={() => false}>
                  {this.state.lists
                    ? <AccountsListView navigator={this.props.navigation} close={this.onBackdropPress} pay={this.state.pay} />
                    : <View style={{flexDirection: 'row', marginLeft: -5, marginTop: -5}}>
                      <TouchableWithoutFeedback onPress={() => this.switchView('pay')}>
                        <View style={{width: Dimensions.get('window').width / 2, height: calculateHeightRatio(150), backgroundColor: '#242437', justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{height: calculateHeightRatio(92), width: calculateWidthRatio(100)}} source={require('circles-mobile/images/pay.png')} />
                          <Text style={{fontFamily: 'now-alt-bold', fontSize: 14, color: 'white', marginTop: 12}}>Pay</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={() => this.switchView('request')}>
                        <View style={{width: Dimensions.get('window').width / 2, height: calculateHeightRatio(150), backgroundColor: '#242437', justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{height: calculateHeightRatio(92), width: calculateWidthRatio(93)}} source={require('circles-mobile/images/request.png')} />
                          <Text style={{fontFamily: 'now-alt-bold', fontSize: 14, color: 'white', marginTop: 12}}>Request</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>}
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <View style={{height: 60, flexDirection: 'column', justifyContent: 'center'}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
              <View>
                <Image style={{height: calculateHeightRatio(29), width: calculateWidthRatio(30)}} source={require('circles-mobile/images/search.png')} />
                {/* <SimpleLineIcons style={{alignSelf: 'center'}} name='magnifier' size={32} color='gray' />
                <Text>Search</Text> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default Tabs
