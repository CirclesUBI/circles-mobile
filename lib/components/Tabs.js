import React from 'react'
import { Text, View, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
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
    marginLeft: 12
  }
})

const ListView = () => {
  return <View>
    <Text>
      Hey Sexy
    </Text>
  </View>
}
class Tabs extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)
    this.state = {
      opened: true,
      lists: false
    }
    this.switchView = this.switchView.bind(this)
  }
  // onTriggerPress () {
  //   this.setState({ opened: true })
  // }
  // onOptionSelect (value) {
  //   alert(`Selected number: ${value}`)
  //   this.setState({ opened: false })
  // }
  // onBackdropPress () {
  //   this.setState({ opened: false })
  // }
  switchView () {
    console.log('hi')
    this.setState({lists: !this.state.lists})
    return false
  }

  render () {
    const { opened } = this.state
    console.log(this.state)
    return (
      <View style={{height: 60, flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{height: 60, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
            <View>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='home' size={32} color='gray' />
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{height: 60, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <Menu
            renderer={Popover}
            rendererProps={{anchorStyle: styles.anchorStyle}}
            // opened={opened}
            // onBackdropPress={() => this.onBackdropPress()}
            // onSelect={value => true}
          >
            <MenuTrigger>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='calculator' size={32} color='gray' />
              <Text>Transact</Text>
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer: {width: Dimensions.get('window').width, marginLeft: -7, height: 150, padding: 0, margin: 0}}}>
              <MenuOption customStyles={{optionWrapper: {margin: 0}}} onSelect={() => false}>
                {this.state.lists
                  ? <ListView />
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
              {/* <MenuOption customStyles={{optionWrapper: {margin: 0}}}>
                <View style={{flexDirection: 'row', marginLeft: -5, marginTop: -5}}>
                  <View style={{width: Dimensions.get('window').width / 2, height: 150, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Pay</Text>
                  </View>
                  <View style={{width: Dimensions.get('window').width / 2, height: 150, backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Request</Text>
                  </View>
                </View>
              </MenuOption> */}
              {/* <MenuOption onSelect={() => this.props.navigation.navigate('addOrgWallet.AddWallet')} text={'⨁ Add Org Wallet'} /> */}
            </MenuOptions>
          </Menu>
          {/* <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Transact')}>
            <View>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='calculator' size={32} color='gray' />
              <Text>Transact</Text>
            </View>
          </TouchableWithoutFeedback> */}
        </View>
        <View style={{height: 60, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
            <View>
              <SimpleLineIcons style={{alignSelf: 'center'}} name='magnifier' size={32} color='gray' />
              <Text>Search</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default Tabs
