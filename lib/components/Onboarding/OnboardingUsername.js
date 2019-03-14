import React from 'react'
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
  constructor () {
    super()
    this.state = {
      username: ''
    }
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
          label={'Username'}
          placeholder={'Username'}
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
            This field is required
          </Text>
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
)(OnboardingUsername)
