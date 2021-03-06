import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, TouchableHighlight, View, Image, FlatList } from 'react-native'
import { SegmentedControl } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background4, background3, fonts } from 'circles-mobile/lib/styles'
import SuggestionActionButtons from 'circles-mobile/lib/components/shared/SuggestionActionButtons'
import { numberWithCommas } from 'circles-mobile/lib/utilities'

class WalletScreen extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.handleSegmentControl = this.handleSegmentControl.bind(this)
    this.state = {
      // todo: what is controlIndex?
      controlIndex: typeof props.navigation.state.params !== 'undefined'
        ? props.navigation.state.params.controlIndex
        : 0
    }
    this.translate = translate
  }
  
  handleSegmentControl (e) {
    this.setState({
      controlIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  _keyExtractor (item, index) {
    return index + ''
  }

  render () {
    // let notifications = this.props.wallets[this.props.user.selectedWallet].notifications.map((notification, i) => {
    //   return (
    //     <View key={i}>
    //       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
    //         <Image
    //           style={{
    //             width: calculateWidthRatio(37),
    //             height: calculateHeightRatio(37),
    //             resizeMode: 'contain'
    //           }}
    //           source={require('circles-mobile/images/circlesDistribution.png')}
    //         />
    //         <Text style={{marginLeft: 16, fontSize: 16, fontFamily: fonts.boldText, color: 'white'}}>
    //           {`You received ${notification.value} CCS`}
    //         </Text>
    //       </View>
    //       {
    //         notification.first
    //           ? <Text style={{fontSize: 12, fontFamily: fonts.primaryText, color: 'white', marginTop: 30}}>
    //           You have been issued your first Circles basic income!
    //           </Text>
    //           : null
    //       }
    //     </View>
    //   )
    // })
    // console.log(this.props.wallets, this.props.app)
    return (
      <View style={{ flex: 1, backgroundColor: background4 }}>
        <View style={{
          flex: 0.22,
          backgroundColor: background3,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 3 }
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 25,
            marginLeft: 23,
            marginRight: 23
          }}>
            <TouchableHighlight
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 35,
                width: 35
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
                source={require('circles-mobile/images/close.png')} />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontFamily: fonts.boldText }}>
              {this.props.user.name}
            </Text>
            <View style={{ minHeight: calculateHeightRatio(35), minWidth: calculateWidthRatio(35) }} />
          </View>
          <Text style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: fonts.primaryText,
            fontSize: 12,
            color: '#CECECE'
          }}>
            {`Account Value: ${this.props.wallets[this.props.app.activeWallet].balance
              ? numberWithCommas(this.props.wallets[this.props.app.activeWallet].balance)
              : 0} CCS`}
          </Text>
          <SegmentedControl
            values={['Transactions', 'Notifications']}
            tintColor={primary}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{ margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center' }}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{
          flex: 0.08,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: 'rgba(58, 59, 78, 0.49)'
        }}>
          <Text style={{
            textAlign: 'center',
            fontFamily: fonts.primaryText,
            fontSize: 12,
            color: '#CECECE'
          }}>
            {this.translate('CALCULATE NEXT CIRCLE ISSUANCE')}
          </Text>
        </View>

        <View style={{ flex: this.props.app.contactSuggestion ? 0.45 : 0.62 }}>
          {
            this.state.controlIndex
              ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* {notifications} */}
              </View>
              : <FlatList
                // data={this.props.wallets[this.props.user.selectedWallet].transactions}
                data={[]}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: calculateHeightRatio(52),
                    borderBottomWidth: 1,
                    borderColor: 'rgba(58, 59, 78, 49)'
                  }}>
                  <Image
                    style={{
                      width: calculateWidthRatio(26),
                      height: calculateHeightRatio(26),
                      marginLeft: 27,
                      resizeMode: 'contain'
                    }}
                    source={require('circles-mobile/images/circlesDistribution.png')}
                  />
                  <Text style={{
                    marginLeft: 19,
                    fontSize: 12,
                    fontFamily: fonts.primaryText,
                    color: '#CECECE'
                  }}>
                    {`You ${item.type === 'request'
                      ? 'received'
                      : 'sent'} ${item.amount} CCS ${item.type === 'request'
                      ? 'from'
                      : 'to'} ${item.source}`}
                  </Text>
                </View>}
              />
          }
        </View>
        <View style={{ flex: this.props.app.contactSuggestion ? 0.25 : 0.08 }}>
          <SuggestionActionButtons navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}

WalletScreen.contextTypes = {
  t: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    app: state.app,
    wallets: state.wallets
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dismissContact: () => dispatch(dismissedContact())
//   }
// }

export default connect(mapStateToProps)(WalletScreen)
