import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TouchableWithoutFeedback, Dimensions, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo'
import AccountsListView from 'circles-mobile/lib/components/Tabs/AccountsList'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu'
import { background3, fonts } from 'circles-mobile/lib/styles'
const { Popover } = renderers
const styles = StyleSheet.create({
  anchorStyle: {
    marginRight: 7,
    backgroundColor: background3
  }
})

class Tabs extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      opened: false,
      lists: false,
      pay: false,
      request: false
    }
    this.translate = ctx.t
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
          colors={[background3, '#151520']}
          style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}
        >
          <View style={{height: 60, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
              <View>
                <Image style={{height: calculateHeightRatio(28), width: calculateWidthRatio(31), resizeMode: 'contain'}} source={require('circles-mobile/images/home.png')} />
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
                <Image style={{height: calculateHeightRatio(32), width: calculateWidthRatio(30), resizeMode: 'contain'}} source={require('circles-mobile/images/calculator.png')} />
              </MenuTrigger>
              <MenuOptions customStyles={{optionsContainer: {width: Dimensions.get('window').width, marginLeft: 8, height: calculateHeightRatio(150), padding: 0, margin: 0}}}>
                <MenuOption customStyles={{optionWrapper: {margin: 0}}} onSelect={() => false}>
                  {this.state.lists
                    ? <AccountsListView navigator={this.props.navigation} close={this.onBackdropPress} pay={this.state.pay} user={this.props.user} wallets={this.props.wallets} />
                    : <View style={{flexDirection: 'row', marginLeft: -5, marginTop: -5}}>
                      <TouchableWithoutFeedback onPress={() => this.switchView('pay')}>
                        <View style={{width: Dimensions.get('window').width / 2, height: calculateHeightRatio(150), backgroundColor: '#242437', justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{height: calculateHeightRatio(92), width: calculateWidthRatio(100), resizeMode: 'contain'}} source={require('circles-mobile/images/pay.png')} />
                          <Text style={{fontFamily: fonts.boldText, fontSize: 14, color: 'white', marginTop: 12}}>{translate('Pay')}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={() => this.switchView('request')}>
                        <View style={{width: Dimensions.get('window').width / 2, height: calculateHeightRatio(150), backgroundColor: '#242437', justifyContent: 'center', alignItems: 'center'}}>
                          <Image style={{height: calculateHeightRatio(92), width: calculateWidthRatio(93), resizeMode: 'contain'}} source={require('circles-mobile/images/request.png')} />
                          <Text style={{fontFamily: fonts.boldText, fontSize: 14, color: 'white', marginTop: 12}}>{translate('Request')}</Text>
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
                <Image style={{height: calculateHeightRatio(29), width: calculateWidthRatio(30), resizeMode: 'contain'}} source={require('circles-mobile/images/search.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

Tabs.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    wallets: state.wallets
  }
}

export default connect(mapStateToProps)(Tabs)
