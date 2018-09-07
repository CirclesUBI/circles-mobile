import React from 'react'
import { connect } from 'react-redux'
import { Image, Text, View, Dimensions, StyleSheet } from 'react-native'
import { Button } from 'antd-mobile-rn'
import { LinearGradient } from 'expo'
import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'
import { secondary, fonts } from 'circles-mobile/lib/styles'

const styles = StyleSheet.create({

  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 12

  },
  loginButton: {
    borderRadius: 7,
    borderWidth: 0,
    width: calculateWidthRatio(237),
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class ConnectScreen extends React.Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          colors={[secondary, '#160111']}
          style={{flex: 1, width: Dimensions.get('window').width}}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{height: 148, width: calculateWidthRatio(146), marginTop: calculateHeightRatio(98), resizeMode: 'contain'}}
              source={require('circles-mobile/images/logo.png')}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: calculateHeightRatio(180)}}>
            <Button onClick={() => {
              this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
            }} style={[styles.loginButton, {backgroundColor: '#9353C8', marginBottom: calculateHeightRatio(20)}]}>
              <Text style={styles.loginText}>CONNECT WITH UPORT</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
            }} style={[styles.loginButton, {backgroundColor: '#536EC8', marginBottom: calculateHeightRatio(23)}]}>
              <Text style={styles.loginText}>CONNECT WITH FACEBOOK</Text>
            </Button>
            <Button onClick={() => {
              this.props.navigation.navigate(this.props.wallets[this.props.user.selectedWallet].primary ? 'HomeScreen' : 'OrgHome')
            }} style={[styles.loginButton, {backgroundColor: '#F5F5F5', marginBottom: calculateHeightRatio(33)}]}>
              <Text style={[styles.loginText, {color: '#353535'}]}>CONNECT WITH GOOGLE</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    wallets: state.wallets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // storeUser: (user) => dispatch(storeUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectScreen)
