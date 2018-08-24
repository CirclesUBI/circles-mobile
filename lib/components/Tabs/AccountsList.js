import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { selectedTransactionWallet } from 'circles-mobile/lib/actions/UserActions'
import { background3, textColor2, fonts } from 'circles-mobile/lib/styles/styles'

const AccountsListViewComponent = (props) => {
  let walletNames = Object.keys(props.wallets)
  let wallets = walletNames.map((wallet, i) => (
    <TouchableWithoutFeedback key={i} onPress={() => {
      props.close()
      props.selectWallet(walletNames[i])
      props.pay ? props.navigator.navigate('PayAmount') : props.navigator.navigate('RequestAmount')
    }}>
      <View style={{height: calculateHeightRatio(45), alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: fonts.primaryText, color: textColor2, fontSize: 14}}>
          {walletNames[i]}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ))

  return (
    <View style={{backgroundColor: background3, marginLeft: -5, marginRight: -5, marginTop: -5, height: calculateHeightRatio(150)}}>
      <View style={{backgroundColor: background3, height: 60, justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgba(58,59,78, 49)'}}>
        <Text style={{color: 'white', fontSize: 18, fontFamily: fonts.boldText, textAlign: 'center'}}>
          Select Wallet
        </Text>
      </View>
      <ScrollView>
        {/* <TouchableWithoutFeedback onPress={() => {
          props.close()
          props.pay ? props.navigator.navigate('PayAmount') : props.navigator.navigate('RequestAmount')
        }}>
          <View style={{height: calculateHeightRatio(45), alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'rgba(58,59,78, 49)'}}>
            <Text style={{fontFamily: fonts.primaryText, color: textColor2, fontSize: 14}}>
              {props.user.name}
            </Text>
          </View>
        </TouchableWithoutFeedback> */}
        {wallets}
      </ScrollView>
    </View>
  )
}

const mapStateToProps0 = (state) => {
  return {}
}

const mapDispatchToProps0 = (dispatch) => {
  return {
    selectWallet: (wallet) => dispatch(selectedTransactionWallet(wallet))
  }
}

export default connect(mapStateToProps0, mapDispatchToProps0)(AccountsListViewComponent)
