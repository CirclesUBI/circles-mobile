import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
// import { defaultTheme } from 'uPortMobile/lib/styles'

const CustomText = (props, context) => {
  const { styles } = context.theme ? context.theme : {}
  return (
    <Text style={[
      props.title && styles.title,
      props.subTitle && styles.subTitle,
      props.p && styles.p,
      props.bold && styles.bold,
      props.noMargin && styles.noMargin,
      props.legal && styles.legal,
      props.infoButtonLabel && styles.infoButtonLabel,
      props.checkBoxLabel && styles.checkBoxLabel,

      props.seedPhraseTitle && styles.seedPhraseTitle,
      props.seedPhraseWord && styles.seedPhraseWord,
      props.seedPhraseNumber && styles.seedPhraseNumber,
      props.seedConfirmButtonLabel && styles.seedConfirmButtonLabel,
      props.invert && styles.invert,
      props.style
    ]}>
      {props.children}
    </Text>
  )
}

CustomText.propTypes = {
  title: PropTypes.bool,
  p: PropTypes.bool,
  legal: PropTypes.bool,
  infoButtonLabel: PropTypes.bool,
  checkBoxLabel: PropTypes.bool
}

CustomText.contextTypes = {
  theme: PropTypes.object
}

export default CustomText
