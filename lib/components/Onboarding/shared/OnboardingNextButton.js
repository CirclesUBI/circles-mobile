import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import OnboardingStyles from 'circles-mobile/lib/styles/OnboardingStyles'
import { primary } from 'circles-mobile/lib/styles'

export default (props) => (
  // <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 30, marginRight: 30, marginTop: 40, maxHeight: 60 }}>
    <TouchableHighlight
      style={[OnboardingStyles.button, { backgroundColor: props.active ? primary : '#dadada' }]}
      onPress={props.active ? props.onPress : null}
    >
      <Text style={[OnboardingStyles.buttonText, { textAlign: 'center' }]}>
        {props.buttonText || 'NEXT'}
      </Text>
    </TouchableHighlight>
  /* </View> */
)