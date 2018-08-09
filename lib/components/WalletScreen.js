import React from 'react'
import { connect } from 'react-redux'
import { Text, TouchableHighlight, View, Image, FlatList } from 'react-native'
import { SegmentedControl } from 'antd-mobile-rn'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, textColorMain, lightBackground } from 'circles-mobile/lib/styles/styles'
import ActionButtons from 'circles-mobile/lib/components/Buttons/actionButtons'
import { numberWithCommas } from 'circles-mobile/lib/utilities'

class WalletScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleSegmentControl = this.handleSegmentControl.bind(this)
    this.state = {
      controlIndex: typeof props.navigation.state.params !== 'undefined'
        ? props.navigation.state.params.controlIndex
        : 0
    }
  }
  handleSegmentControl (e) {
    this.setState({
      controlIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#161724'}}>
        <View style={{
          flex: 0.22,
          backgroundColor: '#232436',
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: 3}
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
                this.props.navigation.goBack()
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
            <Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'now-alt-bold'}}>
              {this.props.user.name}
            </Text>
            <View style={{minHeight: calculateHeightRatio(35), minWidth: calculateWidthRatio(35)}} />
          </View>
          <Text style={{
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'now-alt-regular',
            fontSize: 12,
            color: '#CECECE'
          }}>
            {`Account Value: ${numberWithCommas(this.props.user.balance)} CCS`}
          </Text>
          <SegmentedControl
            values={['Transactions', 'Notifications']}
            tintColor={primary}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
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
            extAlign: 'center',
            fontFamily: 'now-alt-regular',
            fontSize: 12,
            color: '#CECECE'
          }}>
            Your next Circles issuance is due 10/24/18
          </Text>
        </View>

        <View style={{flex: 0.45}}>
          {
            this.state.controlIndex
            ? <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 35}}>
                <Image
                  style={{
                    width: calculateWidthRatio(37),
                    height: calculateHeightRatio(37),
                    resizeMode: 'contain'
                  }}
                  source={require('circles-mobile/images/circlesDistribution.png')}
                />
                <Text style={{marginLeft: 16, fontSize: 16, fontFamily: 'now-alt-bold', color: 'white'}}>
                  You received 1000 CCS
                </Text>
              </View>
              <Text style={{fontSize: 12, fontFamily: 'now-alt-regular', color: 'white', marginTop: 30}}>
                You have been issued your first Circles basic income!
              </Text>
            </View>
            : <FlatList
              data={[{key: 'a', value: 1000}, {key: 'b', value: 500}]}
              renderItem={({item}) => <View
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
                  fontFamily: 'now-alt-regular',
                  color: '#CECECE'
                }}>
                  {`You received ${item.value} CCS`}
                </Text>
              </View>}
            />
          }
        </View>
        <View style={{flex: 0.17, backgroundColor: lightBackground}}>
          <Text style={{
            fontFamily: 'now-alt-regular',
            fontSize: 12,
            color: textColorMain,
            marginLeft: 23,
            marginRight: 23,
            marginTop: 20
          }}>
            Connect with people in your network that you trust to spend your circles
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
            <Text style={{fontFamily: 'now-alt-bold', color: textColorMain}}>
              Skip
            </Text>
          </View>
        </View>
        <ActionButtons navigation={this.props.navigation} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    vendors: state.vendors,
    wallets: state.wallets,
    inventory: state.inventory
  }
}

export default connect(mapStateToProps)(WalletScreen)
