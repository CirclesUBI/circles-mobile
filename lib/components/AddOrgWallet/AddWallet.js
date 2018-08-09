import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View, Image, TextInput } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, darkBackground, mediumLightBackground } from 'circles-mobile/lib/styles/styles'

const styles = StyleSheet.create({
  step: {
    width: calculateWidthRatio(61),
    height: calculateHeightRatio(27),
    borderRadius: 5,
    marginLeft: calculateWidthRatio(19),
    borderWidth: 1,
    borderColor: '#494949',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepText: {
    fontFamily: 'now-alt-regular',
    color: 'white',
    fontSize: 12
  }
})

class AddWallet extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({text: value})
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: darkBackground}}>
        <View
          style={{
            height: calculateHeightRatio(66),
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: mediumLightBackground,
            shadowOffset: {width: 0, height: 4},
            shadowColor: 'rgba(7, 7, 7, 0.5)',
            shadowOpacity: 0.2
          }}>
          <TouchableHighlight
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
              width: 35,
              marginRight: 11
            }}
            onPress={() => {
              this.props.navigation.navigate('Home')
            }}
          >
            <Image
              style={{
                height: calculateHeightRatio(35),
                width: calculateWidthRatio(35),
                resizeMode: 'contain'
              }}
              source={require('circles-mobile/images/close.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row', height: calculateHeightRatio(61), alignItems: 'center'}}>
          <View style={[styles.step, {backgroundColor: primary, borderColor: primary}]}>
            <Text style={styles.stepText}>
              Step 1
            </Text>
          </View>
          <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              Step 2
            </Text>
          </View>
          <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              Step 3
            </Text>
          </View>
          {/* <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              Step 4
            </Text>
          </View> */}
          <Image
            style={{
              height: calculateHeightRatio(18),
              width: calculateWidthRatio(10),
              marginLeft: calculateWidthRatio(15),
              resizeMode: 'contain'
            }}
            source={require('circles-mobile/images/arrowRight.png')}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <View style={{
              height: calculateHeightRatio(194),
              width: calculateWidthRatio(338.8),
              borderWidth: 1,
              borderColor: '#252635',
              justifyContent: 'center'
            }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginLeft: calculateWidthRatio(12)
                }}>
                <Text style={{fontFamily: 'now-alt-bold', color: 'white', fontSize: 16}}>
                  1. Create an organizational wallet*
                </Text>
                <Image
                  style={{
                    height: calculateHeightRatio(10),
                    width: calculateWidthRatio(18),
                    marginLeft: calculateWidthRatio(11),
                    resizeMode: 'contain'
                  }}
                  source={require('circles-mobile/images/arrowDown.png')}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'now-alt-regular',
                  color: '#CECECE',
                  fontSize: 12,
                  marginLeft: calculateWidthRatio(12),
                  marginRight: calculateWidthRatio(87.8),
                  marginTop: 15}}
                >
                This secondary wallet will not receive a basic income and is only visible to you or administrators that you add.
              </Text>
              <View style={{
                width: calculateWidthRatio(315),
                height: calculateHeightRatio(43),
                marginTop: calculateHeightRatio(28),
                borderColor: '#272838',
                borderWidth: 1,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }}>
                <TextInput
                  style={{color: '#CECECE', fontSize: 12, textAlign: 'center', fontFamily: 'now-alt-regular'}}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange(value)} /* needs test */
                  label='Organization Name'
                  placeholder='Enter wallet name'
                  placeholderTextColor='#686868'
                  autofocus
                  keyboardAppearance={'dark'}
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 15, marginBottom: 15}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('addOrgWallet.AddOffer', {orgName: this.state.text})
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'now-alt-regular', fontSize: 14, color: 'white'}}>
                  Next
                </Text>
                <Image
                  style={{
                    height: calculateHeightRatio(29),
                    width: calculateWidthRatio(29),
                    marginLeft: calculateWidthRatio(9),
                    resizeMode: 'contain'
                  }}
                  source={require('circles-mobile/images/circleArrowRight.png')} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default AddWallet
