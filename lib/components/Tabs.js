import React from 'react'
import { Text, View, TouchableWithoutFeedback, Dimensions, StyleSheet, Image } from 'react-native'
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
    marginRight: 7
  }
})

const AccountsListView = (props) => {
  return <List>
    <List.Item>
      <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Select Wallet</Text>
    </List.Item>
    <List.Item onClick={() => { props.close(); props.navigator.navigate('PayAmount') }}>
      <Text style={{textAlign: 'center'}}>Ashoka Finley</Text>
    </List.Item>
    <List.Item onClick={() => { props.close(); props.navigator.navigate('RequestAmount') }}>
      <Text style={{textAlign: 'center'}}>Knitted Socks</Text>
    </List.Item>
  </List>
}
class Tabs extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      opened: false,
      lists: false
    }
    this.switchView = this.switchView.bind(this)
    this.onBackdropPress = this.onBackdropPress.bind(this)
  }

  onTriggerPress () {
    this.setState({opened: !this.state.opened})
  }

  onBackdropPress () {
    this.setState({ opened: false, lists: false })
  }

  switchView () {
    this.setState({lists: !this.state.lists})
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
              <MenuOptions customStyles={{optionsContainer: {width: Dimensions.get('window').width, marginLeft: 8, height: 150, padding: 0, margin: 0}}}>
                <MenuOption customStyles={{optionWrapper: {margin: 0}}} onSelect={() => false}>
                  {this.state.lists
                    ? <AccountsListView navigator={this.props.navigation} close={this.onBackdropPress} />
                    : <View style={{flexDirection: 'row', marginLeft: -5, marginTop: -5}}>
                      <TouchableWithoutFeedback onPress={() => this.switchView()}>
                        <View style={{width: Dimensions.get('window').width / 2, height: 150, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Pay</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={() => this.switchView()}>
                        <View style={{width: Dimensions.get('window').width / 2, height: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                          <Text>Request</Text>
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
