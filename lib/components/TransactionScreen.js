import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'
export default class KeypadScreen extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor () {
    super()
    this.state = {
      value: ''
    }
    this.addNumber = this.addNumber.bind(this)
    this.deleteNumber = this.deleteNumber.bind(this)
  }

  addNumber (number) {
    this.setState({value: this.state.value + number})
  }

  deleteNumber (number) {
    this.setState({value: this.state.value.slice(0, this.state.value.length - 1)})
  }

  render () {
    return (
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, width: 315}}>
          <TouchableOpacity onPress={() => Navigation.push({
            screen: 'ProfileScreen',
            navigatorStyle: {
              navBarHidden: true
            }
          })}>
            <Icon
              name='ios-person'
              style={{fontSize: 40}}
            />
          </TouchableOpacity>
          <Icon
            name='ios-add'
            style={{fontSize: 40}}
          />
          <TouchableOpacity onPress={() => Navigation.push({
            screen: 'LookupScreen',
            navigatorStyle: {
              navBarHidden: true
            }
          })}>
            <Icon
              name='ios-search-outline'
              style={{fontSize: 40}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, height: 500}}>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{fontSize: 60, height: 60, maxWidth: 335}}>
              {this.state.value}
            </Text>
          </View>
          <View style={{width: 330, flex: 1, alignItems: 'center', marginTop: 40}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.addNumber(1)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(2)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(3)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.addNumber(4)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(5)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(6)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.addNumber(7)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(8)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(9)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.addNumber('.')} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.addNumber(0)} style={{width: 110}}>
                <Text style={{fontSize: 80, textAlign: 'center'}}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.deleteNumber} style={{width: 110}}>
                <Icon name='ios-backspace-outline' style={{fontSize: 60, textAlign: 'center'}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: 60}}>
          <TouchableOpacity style={{flexGrow: 1, borderRightWidth: 1, borderColor: 'white', backgroundColor: '#0BD8AA', width: 187.5, height: 60, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>REQUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexGrow: 1, borderLeftWidth: 1, borderColor: 'white', backgroundColor: '#0BD8AA', width: 187.5, height: 60, justifyContent: 'center'}}>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>PAY</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}
