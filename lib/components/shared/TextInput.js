import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text, TouchableHighlight } from 'react-native'
// import { defaultTheme } from 'uPortMobile/lib/styles'

class CustomTextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      prefixActive: false
    }
  }
  render () {
    const { props, context } = this
    const { isDark } = context.theme ? context.theme : {}
    const styles = {}
    const colors = {}
    return (
      <View>
        {props.label && <Text
          style={styles && styles.textInputLabel}>
          {props.label}
        </Text>}
        <View style={[styles.textInputWrapper, props.multiline && styles.textInputWrapperMultiline]}>
          {props.prefixValue && <TouchableHighlight
            style={styles.textInputPrefixButton}
            onPress={props.prefixOnPress}
            underlayColor={colors.brand}
            onShowUnderlay={() => this.setState({prefixActive: true})}
            onHideUnderlay={() => this.setState({prefixActive: false})}
          >
            <Text style={[
              styles.textInputPrefixLabel,
              {color: this.state.prefixActive ? colors.background : colors.brand}
            ]}>
              {props.prefixValue}
            </Text>
          </TouchableHighlight>}
          <TextInput
            {...props}
            underlineColorAndroid={colors.background}
            keyboardAppearance={isDark ? 'dark' : 'light'}
            style={[styles.textInput, props.multiline && styles.textInputMultiline]}
            placeholderTextColor={colors.border}
            multiline={props.multiline}
          />
        </View>
      </View>
    )
  }
}

CustomTextInput.propTypes = {
  ...TextInput.propTypes,
  label: PropTypes.string,
  prefixValue: PropTypes.string,
  prefixOnPress: PropTypes.func,
  multiline: PropTypes.bool
}

CustomTextInput.contextTypes = {
  theme: PropTypes.object
}

export default CustomTextInput
