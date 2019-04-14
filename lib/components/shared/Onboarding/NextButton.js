import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight, View } from 'react-native'
import OnboardingStyles from 'circles-mobile/lib/styles/OnboardingStyles'
import { primary } from 'circles-mobile/lib/styles'

 const NextButton = (props, {t: translate}) => (
  <TouchableHighlight
    style={[OnboardingStyles.button, { backgroundColor: props.active ? primary : '#dadada' }]}
    onPress={props.active ? props.onPress : null}
  >
    <Text style={[OnboardingStyles.buttonText, { textAlign: 'center' }]}>
      {translate('NEXT')}
    </Text>
  </TouchableHighlight>
)

NextButton.contextTypes = {
  t: PropTypes.func.isRequired
}

export default NextButton