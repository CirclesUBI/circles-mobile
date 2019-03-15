import React from 'react'
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

export default (props) => (
  <View style={{ flex: 0.25, flexDirection: 'row' }}>
    <TouchableHighlight
      style={[styles.loginButton, { backgroundColor: primary }]}
      onPress={props.handleLoginButton}
    >
      <Text style={styles.loginText}>
        LOGIN
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={[styles.loginButton, { backgroundColor: secondary }]}
      onPress={() => {
        props.navigation.push('Name')
      }}
    >
      <Text style={styles.loginText}>
        SIGN UP
      </Text>
    </TouchableHighlight>
  </View>
)
