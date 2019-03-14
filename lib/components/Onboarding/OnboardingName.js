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
    // <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center' }} behavior='padding'>
    //   <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
    //     <OnboardingNavBar navigation={this.props.navigation} progressAmount={'10%'} />
    //     <View style={{ flex: 1 }}>
    //       <View style={{ flex: 0.75 }}>
    //         <TextInput
    //           style={{
    //             width: '84%',
    //             color: 'white',
    //             fontSize: 16,
    //             fontFamily: fonts.primaryText,
    //             borderBottomWidth: 1,
    //             marginTop: '40%',
    //             alignSelf: 'center',
    //             textAlign: 'left',
    //             borderColor: 'white',
    //             paddingBottom: 10
    //           }}
    //           onChangeText={value => this.handleChange(value)} /* needs test */
    //           label='Name'
    //           placeholder='Name'
    //           placeholderTextColor='white'
    //           autofocus
    //           keyboardAppearance={'dark'}
    //           autoCapitalize='none'
    //           returnKeyType='next'
    //           onEndEditing={this.onProcess}
    //         />
    //       </View>
    //       <View style={{ flex: 0.25, justifyContent: 'flex-end' }}>
    //         <NextButton active={this.state.name} onPress={this.onProcess} />
    //         <TouchableHighlight onPress={() => this.props.navigation.push('Username')}>
    //           <Text style={{
    //             color: 'white',
    //             fontSize: 16,
    //             fontFamily: fonts.primaryText,
    //             alignSelf: 'center',
    //             marginTop: 18
    //           }}>Skip ></Text>
    //         </TouchableHighlight>
    //         <View style={{ height: 60 }} />
    //       </View>
    //     </View>
    //   </LinearGradient>
    // </KeyboardAvoidingView>
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
