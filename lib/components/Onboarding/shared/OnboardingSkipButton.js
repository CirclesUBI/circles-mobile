import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableHighlight,
  Text
} from 'react-native'
import { fonts } from 'circles-mobile/lib/styles'

const OnboardingSkipButton = (props, {t: translate}) => {
  return (
    <TouchableHighlight onPress={() => props.navigation.push(props.destination)}>
      <Text style={{
        color: 'white',
        fontSize: 16,
        fontFamily: fonts.primaryText,
        alignSelf: 'center',
        marginTop: 18
      }}>{translate('Skip')}</Text>
    </TouchableHighlight>
  )
}

OnboardingSkipButton.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingSkipButton