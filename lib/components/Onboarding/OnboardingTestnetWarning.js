import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
// import { Text } from '../shared'
import { background1, primary, fonts, textColor1 } from 'circles-mobile/lib/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: 45
  },
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const OnboardingTestnetWarning = (props, {t: translate}) => {
  return (
    <View style={{flex: 1, backgroundColor: background1}}>
      <NavBar noBack title='!Attention!' />
      <View style={{flex: 0.9, alignItems: 'center'}}>
        <Text title style={{color: textColor1, marginTop: 15, fontSize: 16, fontFamily: fonts.secondaryText, textAlign: 'center'}}>
          {translate("We're On Testnet")}
        </Text>
        <Text style={{color: textColor1, marginTop: 15, textAlign: 'justify', marginLeft: 30, marginRight: 30}}>
          {translate('We are currently in beta of our project. This means that we may have to reset accounts and the status of the network.')}
        </Text>
        <Text style={{color: textColor1, marginTop: 15, textAlign: 'justify', marginLeft: 30, marginRight: 30}}>
          {translate('You may be required to create a new Circles account when we move to mainnet.')}
        </Text>
      </View>
      <View style={{flex: 0.1, backgroundColor: 'white'}}>
        <TouchableHighlight style={[styles.loginButton, {backgroundColor: primary}]} onPress={() => {
          props.navigation.navigate('Complete')
        }}>
          <View>
            <Text style={[styles.loginText, {textAlign: 'center'}]}>{translate('CONTINUE')}</Text>
          </View>

        </TouchableHighlight>
      </View>
    </View>

  )
}

OnboardingTestnetWarning.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingTestnetWarning
