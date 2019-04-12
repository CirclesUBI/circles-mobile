import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'
import { StyleSheet, Text, TouchableHighlight, View, Image, TextInput, ScrollView } from 'react-native'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, background3, fonts } from 'circles-mobile/lib/styles'
import { StackActions, NavigationActions } from 'react-navigation'
import { walletAdd } from 'circles-mobile/lib/actions/WalletActions'
import { walletSelect } from 'circles-mobile/lib/actions/UserActions'
import { addOrg } from 'circles-mobile/lib/actions/OrganizationActions'

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

const ViewRow = (props, {t: translate}) => (
  <View style={{
    height: calculateHeightRatio(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#272838'
  }}>
    <Text style={{marginLeft: 17, fontFamily: fonts.primaryText, fontSize: 12, color: 'white'}}>{props.name}</Text>
    <TouchableHighlight>
      <View style={{
        width: calculateWidthRatio(112),
        height: calculateHeightRatio(35),
        backgroundColor: '#FFAE00',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10}}
      >
        <Text style={{fontFamily: fonts.secondaryText, fontSize: 12, color: 'white'}}>{translate('Invite as Admin')}</Text>
      </View>
    </TouchableHighlight>
  </View>
)
class AddAdmin extends React.Component {
  constructor (props, {t: tramslate}) {
    super(props)
    this.state = { text: '' }
    this.translate = translate
    this.handleChange = this.handleChange.bind(this)
    this.walletAddHandler = this.walletAddHandler.bind(this)
  }

  handleChange (value) {
    this.setState({text: value})
  }

  resetAction () {
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'OrgWalletView' })]
    })
  }

  walletAddHandler () {
    this.props.addWallet({
      [this.props.navigation.state.params.orgName]: {
        balance: 0,
        admins: {},
        service: this.props.navigation.state.params.service ? this.props.navigation.state.params.service : null
      }
    })
    this.props.addOrg({
      id: uuid(),
      owner_id: this.props.user.id,
      email: this.props.user.email,
      agreed_to_disclaimer: true,
      organization_name: this.props.navigation.state.params.orgName,
      profile_pic_url: ''
    })
    this.props.selectWallet(this.props.navigation.state.params.orgName)
    this.props.navigation.navigate('OrgWalletView')
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
            height: 20,
            justifyContent: 'center',
            marginTop: 10
          }} onPress={() => {
            this.props.navigation.navigate('addOrgWallet.AddOffer')
          }}>
            <View style={{flexDirection: 'row', marginLeft: 21, alignItems: 'center'}}>
              <Image style={{
                height: calculateHeightRatio(18),
                resizeMode: 'contain',
                width: calculateWidthRatio(10)
              }} source={require('circles-mobile/images/arrowLeft.png')} />
              <Text style={{fontFamily: fonts.primaryText, color: 'white', marginLeft: 16}}>
                {this.translate('Back')}
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              alignItems: 'center',
              height: 35,
              justifyContent: 'center',
              marginRight: 11,
              width: 35
            }}
            onPress={
              () => {
                this.props.navigation.navigate('Home')
              }
            }
          >
            <Image
              style={{height: calculateHeightRatio(35), width: calculateWidthRatio(35), resizeMode: 'contain'}}
              source={require('circles-mobile/images/close.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row', height: calculateHeightRatio(61), alignItems: 'center'}}>
          <View style={styles.step}>
            <Text style={styles.stepText}>
              {this.translate('Step 1')}
            </Text>
          </View>
          <View style={[styles.step, {marginLeft: calculateWidthRatio(9)}]}>
            <Text style={styles.stepText}>
              {this.translate('Step 2')}
            </Text>
          </View>
          <View style={[styles.step, {
            backgroundColor: primary,
            borderColor: primary,
            marginLeft: calculateWidthRatio(9)
          }]}>
            <Text style={styles.stepText}>
              {this.translate('Step 3')}
            </Text>
          </View>
          <Image style={{
            height: calculateHeightRatio(18),
            width: calculateWidthRatio(10),
            marginLeft: calculateWidthRatio(15),
            resizeMode: 'contain'
          }} source={require('circles-mobile/images/arrowRight.png')} />
        </View>
        <View style={{flex: 1, justifyContent: 'space-between', marginBottom: 15}}>
          <View style={{alignItems: 'center'}}>
            <View style={{
              width: calculateWidthRatio(338.8),
              height: calculateHeightRatio(502),
              borderWidth: 1,
              borderColor: '#252635'
            }}>
              <View style={{
                width: calculateWidthRatio(295),
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 30
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{fontFamily: fonts.boldText, color: 'white', fontSize: 16}}>
                    3. {this.translate('Add Administrators')}
                  </Text>
                  <Image
                    style={{
                      height: calculateHeightRatio(10),
                      width: calculateWidthRatio(18),
                      marginLeft: calculateWidthRatio(11),
                      resizeMode: 'contain'}}
                    source={require('circles-mobile/images/arrowDown.png')}
                  />
                </View>
                <Text style={{
                  fontFamily: fonts.primaryText,
                  color: '#CECECE',
                  fontSize: 12,
                  marginRight: calculateWidthRatio(40),
                  marginTop: 15}}>
                  {this.translate("Adding administrators allows them to request and make payments, and see this organizational wallet's transaction history.")}
                </Text>
              </View>
              <View style={{height: calculateHeightRatio(95), borderTopWidth: 1, borderColor: '#252635'}}>
                <Text style={{
                  fontFamily: fonts.primaryText,
                  fontSize: 14,
                  color: 'white',
                  marginLeft: 20,
                  marginTop: 15
                }}>
                  {this.translate('CONTACTS')}
                </Text>
                <View style={{
                  width: calculateWidthRatio(315),
                  height: calculateHeightRatio(43),
                  marginTop: 15,
                  marginBottom: 5,
                  borderColor: '#272838',
                  borderWidth: 1,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}>
                  <TextInput
                    style={{color: '#CECECE', fontSize: 12, textAlign: 'center', fontFamily: fonts.primaryText}}
                    // onSubmitEditing={Keyboard.dismiss}
                    value={this.state && this.state.text}
                    onChangeText={(value) => this.handleChange(value)} /* needs test */
                    label={this.translate('Organization Name')}
                    placeholder={this.translate('Search Contacts')}
                    placeholderTextColor='#686868'
                    autofocus
                    keyboardAppearance={'dark'}
                  />
                </View>
              </View>
              <ScrollView style={{height: calculateHeightRatio(95), borderTopWidth: 1, borderColor: '#252635'}}>
                <ViewRow name={'Ashoka Finley'} />
                <ViewRow name={'Saraswathi Subbaraman'} />
                <ViewRow name={'Jessica Marshall'} />
                <ViewRow name={'Natalia Lombardo'} />
                <ViewRow name={'Richard Bartlett'} />
              </ScrollView>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 15,
            marginTop: 10,
            marginLeft: 15
          }}>
            <TouchableHighlight onPress={() => {
              this.walletAddHandler()
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 14, color: 'white'}}>
                  {this.translate('Skip this step')}
                </Text>
                <View style={{minWidth: calculateWidthRatio(29), minHeight: calculateHeightRatio(29)}} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
              this.walletAddHandler()
            }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 14, color: 'white'}}>
                  {this.translate('Next')}
                </Text>
                <Image style={{
                  height: calculateHeightRatio(29),
                  width: calculateWidthRatio(9),
                  marginLeft: calculateWidthRatio(9),
                  resizeMode: 'contain'
                }} source={require('circles-mobile/images/circleArrowRight.png')} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

AddAdmin.contextTypes = {
  t: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addWallet: (wallet) => dispatch(walletAdd(wallet)),
    selectWallet: (wallet) => dispatch(walletSelect(wallet)),
    addOrg: (orgObj) => dispatch(addOrg(orgObj))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin)
