import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, TextInput } from 'react-native'
import { SegmentedControl } from 'antd-mobile-rn'
import SuggestionActionButtons from 'circles-mobile/lib/components/shared/SuggestionActionButtons'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { primary, background5, background4, background3, fonts } from 'circles-mobile/lib/styles/styles'

class SearchScreen extends React.Component {
  constructor (props) {
    super(props)
    this.handleSegmentControl = this.handleSegmentControl.bind(this)
    this.state = {
      controlIndex: typeof props.navigation.state.params !== 'undefined' ? props.navigation.state.params.controlIndex : 0,
      walletName: 'Knitted Socks Org'
    }
  }

  handleSegmentControl (e) {
    this.setState({
      controlIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  render () {
    return (
      <View style={{flex: 1, backgroundColor: background4}}>
        <View style={{flex: 0.22, backgroundColor: background3, shadowColor: '#000000', shadowOffset: {width: 0, height: 3}}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <View style={{flexDirection: 'row', width: calculateWidthRatio(315), height: calculateHeightRatio(43)}}>
              <TextInput style={{width: calculateWidthRatio(285), height: calculateHeightRatio(43), backgroundColor: background5, borderBottomLeftRadius: 6, borderTopLeftRadius: 6, marginBottom: 10, padding: 14}}>
                <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: '#686868', marginLeft: 14, paddingLeft: 14}}>Search</Text>
              </TextInput>
              <View style={{width: calculateWidthRatio(30), height: calculateHeightRatio(43), backgroundColor: background5, borderTopRightRadius: 6, borderBottomRightRadius: 6, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: calculateWidthRatio(14), height: calculateHeightRatio(13), resizeMode: 'contain'}} source={require('circles-mobile/images/search.png')} />
              </View>
            </View>
          </View>
          <SegmentedControl
            values={['Individuals', 'Organizations']}
            tintColor={primary}
            selectedIndex={typeof this.state.controlIndex !== 'undefined' ? this.state.controlIndex : 0}
            style={{margin: 15, marginBottom: 15, height: 30, width: calculateWidthRatio(230), alignSelf: 'center'}}
            onChange={(e) => this.handleSegmentControl(e)}
            // onValueChange={(e) => this.handleSegmentControl}
          />
        </View>
        <View style={{flex: this.props.app.contactSuggestion ? 0.53 : 0.70}}>
          <Text style={{fontFamily: fonts.primaryText, fontSize: 12, color: '#9B9B9B', textAlign: 'center', marginTop: 25}}>
            Search for names phone numbers, vendors, and locations
          </Text>
        </View>
        <View style={{flex: this.props.app.contactSuggestion ? 0.25 : 0.08}}>
          <SuggestionActionButtons navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    // user: state.user,
    // vendors: state.vendors,
    // wallets: state.wallets,
    // inventory: state.inventory,
    // updates: state.updates,
    app: state.app
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dismissContact: () => dispatch(dismissedContact())
//   }
// }

export default connect(mapStateToProps)(SearchScreen)
