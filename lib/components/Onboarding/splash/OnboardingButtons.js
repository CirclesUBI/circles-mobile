import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import {
  calculateHeightRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  primary,
  secondary,
  tertiary,
  width,
  fonts
} from 'circles-mobile/lib/styles'

const styles = StyleSheet.create({
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    width: width / 2,
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})

 const OnboardingButtons = (props, {t: translate}) => (
  <View style={{ flex: 0.25, flexDirection: 'row' }}>
    <TouchableHighlight
      style={[styles.loginButton, { backgroundColor: primary }]}
      onPress={props.handleLoginButton}
    >
      <Text style={styles.loginText}>
        {translate('LOGIN')}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={[styles.loginButton, { backgroundColor: secondary }]}
      onPress={() => {
        props.navigation.push('Name')
      }}
    >
      <Text style={styles.loginText}>
        {translate('SIGN UP')}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={[styles.loginButton, { width: width / 3, backgroundColor: tertiary }]}
      onPress={() => {        
        let fakeCognitoUser = {
          attributes: {
            name: 'Guest',
            phone: '+491884838383',
            email: 'email@example.com',
            id: '10',
            picture: { uri: 'https://zblogged.com/wp-content/uploads/2016/02/1-3.jpg' }
          }
        }
        // props.clickHandler()
        props.addCognitoUserData(fakeCognitoUser)
        props.selectWallet('Guest')
        props.navigation.navigate('HomeScreen')
      }}
    >
      <Text style={styles.loginText}>
        {translate('GUEST')}
      </Text>
    </TouchableHighlight>
  </View>
)

OnboardingButtons.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingButtons