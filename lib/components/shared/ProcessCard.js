import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from './KeyboardAware'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { offline, working, completed } from 'circles-mobile/lib/selectors/processStatus'

import { defaultTheme } from 'circles-mobile/lib/styles'
import { onboardingStyles, windowHeight } from 'circles-mobile/lib/styles/globalStyles'
import Status from './Status'
import { OnboardingButton, SkipButton } from './Button'
import { Text } from './Text'

export class ProcessCard extends Component {

  componentWillReceiveProps (nextProps) {
    if (!this.props.completed && nextProps.completed) {
      this.props.onContinue()
    }
  }

  performAction () {
    if (this.props.onProcess) {
      if (this.props.onProcess()) {
        this.props.onContinue && this.props.onContinue()
      }
    } else {
      this.props.onContinue()
    }
  }

  performSkip () {
    (this.props.onSkip || this.props.onContinue)()
  }

  render () {
    const { styles, colors } = this.context.theme ? this.context.theme : defaultTheme
    const props = this.props
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView overScrollMode='always'>
          {props.children}
          {props.process && <Status process={props.process} />}
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={this.props.keyboardVerticalOffset}
        >
          <View style={{backgroundColor: colors.background, alignItems: 'stretch'}}>
            <OnboardingButton
              disabled={props.working || props.invalid || (props.offline && props.onlyOnline)}
              onPress={this.performAction.bind(this)}
            >
              { props.actionText || 'Next' }
            </OnboardingButton>
            { props.skippable
              ? <SkipButton
                title={this.props.skipTitle}
                onPress={this.performSkip.bind(this)}
              />
              : null }
          </View>
        </KeyboardAvoidingView>
        { props.extraInfoBottom
          ? <View>
            {props.extraInfoBottom}
          </View> : null
        }
      </View>
    )
  }
}

ProcessCard.propTypes = {
  process: PropTypes.string,
  actionText: PropTypes.string,
  skippable: PropTypes.bool,
  skipTitle: PropTypes.string,
  invalid: PropTypes.bool, // User entry is not ready to process
  onContinue: PropTypes.func,
  onProcess: PropTypes.func, // Return true to call onContinue directly
  onSkip: PropTypes.func,
  working: PropTypes.bool,
  onlyOnline: PropTypes.bool,
  offline: PropTypes.bool,
  completed: PropTypes.bool,
  keyboardVerticalOffset: PropTypes.number
}

ProcessCard.defaultProps = {
  keyboardVerticalOffset: 0
}

ProcessCard.contextTypes = {
  theme: PropTypes.object
}

export const Base = ProcessCard

export default connect((state, ownProps) => ({
  ...ownProps,
  offline: offline(state),
  completed: completed(state, ownProps.process),
  working: ownProps.process ? working(state, ownProps.process) : false
}))(ProcessCard)
