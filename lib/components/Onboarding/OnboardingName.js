import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'
import OnboardingTextInput from './shared/OnboardingTextInput'
import OnboardingSkipButton from './shared/OnboardingSkipButton'
import NextButton from './shared/OnboardingNextButton'
import { secondary, width, fonts } from 'circles-mobile/lib/styles'
import Progress from 'circles-mobile/lib/components/shared/Progress'
// Actions
import {
  addOnboardingData
} from 'circles-mobile/lib/actions/OnboardingActions'

import ModalDropdown from 'react-native-modal-dropdown'

import { calculateWidthRatio, calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

import { changeLanguage } from 'circles-mobile/lib/actions/SettingsActions'

class OnboardingName extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      name: ''
    }
    this.translate = translate
    this.onProcess = this.onProcess.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectLangage = this.selectLangage.bind(this)
  }

  onProcess () {
    this.props.addOnboardingData({ name: this.state.name })
    this.props.navigation.push('Username')
  }

  handleChange (name) {
    this.setState({ name })
  }

  selectLangage(langIndex, langCode) {
    this.props.changeLanguage(langCode.toLowerCase())
  }

  render () {
    return (
      <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center' }} behavior='padding'>
      <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>      
        <View
          style={{
            height: calculateHeightRatio(66),
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: secondary,
            shadowOffset: { width: 0, height: 4 },
            shadowColor: 'rgba(7, 7, 7, 0.5)',
            shadowOpacity: 0.2,
            flexDirection: 'row',
            marginTop: 15
          }}>
          <ModalDropdown style={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: 20, 
            minWidth: calculateWidthRatio(56) 
          }} 
          textStyle= {{
            color: 'white',
            fontSize: 16,
            fontFamily: fonts.primaryText
          }}
          options={['EN', 'DE']} defaultValue='EN'
          onSelect={this.selectLangage}
        />
          
          <Progress amount={'10%'} />
          <TouchableHighlight style={{ 
            alignItems: 'center',
            justifyContent: 'center',
            height: 20,
            minWidth: calculateWidthRatio(56)
          }}
            onPress={() => this.props.navigation.goBack()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: calculateWidthRatio(15), height: calculateHeightRatio(15), resizeMode: 'contain' }}
                source={require('circles-mobile/images/x.png')} />
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.75 }}>
            <OnboardingTextInput
              changeHandler={this.handleChange}
              label={this.translate('Name')}
              placeholder={this.translate('Name')}
            />
          </View>
          <View style={{ flex: 0.25, justifyContent: 'flex-end' }}>
            <NextButton active={this.state.name} onPress={this.onProcess} />
            <OnboardingSkipButton
              navigation={this.props.navigation}
              destination={'Username'}
            />
            <View style={{ height: 40 }} />
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
    )    
  }
}

OnboardingName.contextTypes = {
  t: PropTypes.func.isRequired
}

export const mapDispatchToProps = dispatch => {
  return {
    addOnboardingData: data => {
      dispatch(addOnboardingData(data))
    },
    changeLanguage: data => dispatch(changeLanguage(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(OnboardingName)
