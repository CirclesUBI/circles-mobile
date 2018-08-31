import React from 'react'
import PropTypes from 'prop-types'

import { ScrollView } from 'react-native'

import KeyboardAwareBase from './KeyboardAwareBase'
import { defaultTheme } from 'uPortMobile/lib/styles'

export default class KeyboardAwareScrollView extends KeyboardAwareBase {
  render() {
    const { styles } = this.context.theme ? this.context.theme : defaultTheme
    return (
      <ScrollView 
        {...this.props}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._keyboardAwareView = r
        }}
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout)
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset)
          if (this.props.onScroll) {
            this.props.onScroll(event)
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize()
        }}
        scrollEventThrottle={200}
      />
    )
  }
}

KeyboardAwareScrollView.propTypes = {
  getTextInputRefs: PropTypes.func,
  onScroll: PropTypes.func
}

KeyboardAwareScrollView.defaultProps = {
  ...KeyboardAwareBase.defaultProps,
  getTextInputRefs: () => {
    return []
  }
};

KeyboardAwareScrollView.contextTypes = {
  theme: PropTypes.object
}
