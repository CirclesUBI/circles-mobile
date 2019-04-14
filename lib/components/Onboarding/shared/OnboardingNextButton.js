import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight, View } from 'react-native'
import OnboardingStyles from 'circles-mobile/lib/styles/OnboardingStyles'
import { primary } from 'circles-mobile/lib/styles'
import { Translate } from 'aws-sdk/clients/all';

const OnboardingNextButton = (props, {t: translate}) => (
  // <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 30, marginRight: 30, marginTop: 40, maxHeight: 60 }}>
    <TouchableHighlight
      style={[OnboardingStyles.button, { backgroundColor: props.active ? primary : '#dadada' }]}
      onPress={props.active ? props.onPress : null}
    >
      <Text style={[OnboardingStyles.buttonText, { textAlign: 'center' }]}>
        {props.buttonText || translate('NEXT')}
      </Text>
    </TouchableHighlight>
  /* </View> */
)

OnboardingNextButton.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingNextButton