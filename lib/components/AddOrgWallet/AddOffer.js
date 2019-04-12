import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight, View, Image, TextInput } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, background3, fonts } from 'circles-mobile/lib/styles'

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
    fontFamily: fonts.primaryText,
    color: 'white',
    fontSize: 12
  }
})

class AddOffer extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      name: '',
      category: '',
      description: ''
    }
    this.translate = translate
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (type, value) {
    this.setState({[type]: value})
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: background5}}>
        <View
          style={{
            height: calculateHeightRatio(66),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: background3,
            shadowOffset: {width: 0, height: 4},
            shadowColor: 'rgba(7, 7, 7, 0.5)',
            shadowOpacity: 0.2
          }}>
          <TouchableHighlight style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 20,
            marginTop: 10
          }} onPress={() => {
            this.props.navigation.navigate('addOrgWallet.AddWallet')
          }}>
            <View style={{flexDirection: 'row', marginLeft: 21, alignItems: 'center'}}>
              <Image style={{
                width: calculateWidthRatio(10),
                height: calculateHeightRatio(18),
                resizeMode: 'contain'
              }} source={require('circles-mobile/images/arrowLeft.png')} />
              <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 16}}>{this.translate('Back')}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
            marginRight: 11
          }} onPress={() => {
            this.props.navigation.navigate('Home')
          }}>
            <Image style={{
              height: calculateHeightRatio(35),
              width: calculateWidthRatio(35),
              resizeMode: 'contain'
            }} source={require('circles-mobile/images/close.png')} />
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row', height: calculateHeightRatio(61), alignItems: 'center'}}>
          <View style={styles.step}>
            <Text style={styles.stepText}>
              {this.translate('Step 1')}
            </Text>
          </View>
          <View style={[styles.step, {
            backgroundColor: primary,
            borderColor: primary,
            marginLeft: calculateWidthRatio(9)
          }]}>
            <Text style={styles.stepText}>
             {this.translate('Step 2')}
            </Text>
          </View>
          <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              {this.translate('Step 3')}
            </Text>
          </View>
          {/* <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              Step 4
            </Text>
          </View> */}
          <Image style={{
            height: calculateHeightRatio(18),
            width: calculateWidthRatio(10),
            marginLeft: calculateWidthRatio(15),
            resizeMode: 'contain'
          }} source={require('circles-mobile/images/arrowRight.png')} />
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center'}}>
            <View style={{
              width: calculateWidthRatio(338.8),
              height: calculateHeightRatio(340),
              borderWidth: 1,
              borderColor: '#252635'
            }}>
              <View style={{width: calculateWidthRatio(285), alignSelf: 'center', marginTop: 30}}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{fontFamily: fonts.boldText, color: 'white', fontSize: 16}}>
                    2. {this.translate('Trading goods and services')}
                  </Text>
                  <Image style={{
                    height: calculateHeightRatio(10),
                    width: calculateWidthRatio(18),
                    marginLeft: calculateWidthRatio(11),
                    resizeMode: 'contain'
                  }} source={require('circles-mobile/images/arrowDown.png')} />
                </View>
                <Text style={{
                  fontFamily: fonts.primaryText,
                  color: '#CECECE',
                  fontSize: 12,
                  marginRight: calculateWidthRatio(40),
                  marginTop: 15}}
                >
                  {this.translate('Please enter information about what you are offering in exchange for Circles. This information will be displayed in the app when people search for organizations.')}
                </Text>
              </View>

              <View style={{
                width: calculateWidthRatio(285),
                marginTop: calculateHeightRatio(30),
                // borderColor: '#272838',
                // borderWidth: 1,
                // borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }}>
                <TextInput
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 12,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(58,59,78,49)'}}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange('name', value)} /* needs test */
                  label={this.translate('Item Name')}
                  placeholder={this.translate('Item Name')}
                  placeholderTextColor='#686868'
                  autofocus
                  keyboardAppearance={'dark'}
                />
                <TextInput
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 12,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(58,59,78,49)'
                  }}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange('category', value)} /* needs test */
                  label={this.translate('Category')}
                  placeholder={this.translate('Category')}
                  placeholderTextColor='#686868'
                  autofocus
                  keyboardAppearance={'dark'}
                />
                <TextInput
                  style={{
                    height: calculateHeightRatio(40),
                    width: calculateWidthRatio(285),
                    color: '#CECECE',
                    fontSize: 12,
                    fontFamily: fonts.primaryText,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(58,59,78,49)'
                  }}
                  // onSubmitEditing={Keyboard.dismiss}
                  value={this.state && this.state.text}
                  onChangeText={(value) => this.handleChange('description', value)} /* needs test */
                  label={this.translate('Description')}
                  placeholder={this.translate('Description')}
                  placeholderTextColor='#686868'
                  autofocus
                  keyboardAppearance={'dark'}
                />
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginTop: 15
                }}>
                  <Image
                    style={{
                      height: calculateHeightRatio(29),
                      width: calculateWidthRatio(29),
                      marginRight: calculateWidthRatio(15),
                      resizeMode: 'contain'
                    }}
                    source={require('circles-mobile/images/photo-camera.png')} />
                  <Text style={{fontFamily: fonts.primaryText, color: '#CBCBCB', fontSize: 12}}>
                    {this.translate('Upload an Image')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 15, marginBottom: 15}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('addOrgWallet.AddAdmin',
                {
                  orgName: this.props.navigation.state.params.orgName,
                  service: {
                    name: this.state.name,
                    category: this.state.category,
                    description: this.state.description
                  }
                }
              )
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 14, color: 'white'}}>
                  {this.translate('Next')}
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

AddOffer.contextTypes = {
  t: PropTypes.func.isRequired
}

export default AddOffer
