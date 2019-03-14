import React from 'react'
import { connect } from 'react-redux'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'
import OnboardingTextInput from './shared/OnboardingTextInput'
import OnboardingSkipButton from './shared/OnboardingSkipButton'

// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

class OnboardingName extends React.Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
    this.onProcess = this.onProcess.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onProcess () {
    this.props.addOnboardingData({ name: this.state.name })
    this.props.navigation.push('Username')
  }

  handleChange (name) {
    this.setState({ name })
  }

  render () {
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'10%'}
        main={<OnboardingTextInput
          changeHandler={this.handleChange}
          label={'Name'}
          placeholder={'Name'}
        />}
        nextButton
        buttonActive={this.state.name}
        buttonPress={this.onProcess}
        footer={
          <OnboardingSkipButton
            navigation={this.props.navigation}
            destination={'Username'}
          />
        }
      />
    )
  }
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
)(OnboardingName)
