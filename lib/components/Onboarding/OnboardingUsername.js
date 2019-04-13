import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import { fonts } from 'circles-mobile/lib/styles'

// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

class OnboardingUsername extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      username: ''
    }
    this.translate = translate
    this.onProcess = this.onProcess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onProcess () {
    this.props.addOnboardingData({ username: this.state.username })
    this.props.navigation.push('Avatar')
  }

  handleChange (username) {
    this.setState({ username })
  }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'20%'}
        main={<OnboardingTextInput
          changeHandler={this.handleChange}
          label={this.translate('Username')}
          placeholder={this.translate('Username')}
        />}
        nextButton
        buttonActive={this.state.username}
        buttonPress={this.onProcess}
        footer={
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontFamily: fonts.primaryText,
            alignSelf: 'center',
            marginTop: 18
          }}>
            {this.translate('This field is required')}
          </Text>
        }
      />
    )
  }
}

OnboardingUsername.contextTypes = {
  t: PropTypes.func.isRequired
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OnboardingUsername)
