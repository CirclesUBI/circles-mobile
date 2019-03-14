import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import OnboardingStyles from 'circles-mobile/lib/styles/OnboardingStyles'
import { primary } from 'circles-mobile/lib/styles'

export default (props) => (
  <TouchableHighlight
    style={[OnboardingStyles.button, { backgroundColor: props.active ? primary : '#dadada' }]}
    onPress={props.active ? props.onPress : null}
  >
    <Text style={[OnboardingStyles.buttonText, { textAlign: 'center' }]}>
      NEXT
    </Text>
  </TouchableHighlight>
)
