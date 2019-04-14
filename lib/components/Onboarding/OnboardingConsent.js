// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import OnboardingScreenComponent from './shared/OnboardingScreenComponent'

// Styles
import {
  fonts,
  textColor1,
  primary
} from 'circles-mobile/lib/styles'

export class OnboardingConsent extends React.Component {
  constructor (props, {t: translate}) {
    super(props)
    this.state = {
      selected: {
        0: false,
        1: false,
        2: false
      },
      totalSelected: 0
    }
    this.translate = translate
    this.onProcess = this.onProcess.bind(this)
  }

  onProcess () {
    this.props.navigation.push('Complete')
  }

  handleConsentTouch (i) {
    this.setState({
      totalSelected: this.state.selected[i] ? this.state.totalSelected - 1 : this.state.totalSelected + 1,
      selected: Object.assign({}, this.state.selected, { [i]: !this.state.selected[i] })
    })
  }
  render () {
    let text = [
      this.translate('Research consent form you know and trust into the Circles system in order to exchange money with them!'),
      this.translate('Privacy policy know and trust into the Circles system in order to exchange money with them!'),
      this.translate('Invite friends you know and trust into the Circles system in order to exchange money with them!')
    ]
    text = text.map((val, i) => {
      return <View style={{ flexDirection: 'row', marginTop: 40 }} key={i}>
        <TouchableHighlight onPress={() => this.handleConsentTouch(i)} underlayColor={'rgba(0,0,0,0)'}>
          <View style={[{ width: 30, height: 30, borderColor: 'white', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }, this.state.selected[i] ? { backgroundColor: primary } : {}]}>
            {this.state.selected[i]
              ? <Image
                style={{ height: 20, width: 20 }}
                source={require('circles-mobile/images/checkmark.png')}
              />
              : null}
          </View>
        </TouchableHighlight>
        <Text
          style={{
            textAlign: 'center',
            color: textColor1,
            width: '60%',
            alignSelf: 'center',
            marginLeft: 20
          }}
        >
          {val}
        </Text>
      </View>
    })
    return (
      <OnboardingScreenComponent
        navigation={this.props.navigation}
        progressAmount={'100%'}
        main={
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 24,
                  fontFamily: fonts.titleText,
                  marginTop: '15%'
                }}
              >
                {this.translate('SOME THINGS FOR REVIEW')}
              </Text>
              <View style={{ alignItems: 'center' }}>
                {text}
              </View>
            </View>
          </View>
        }
        nextButton
        buttonText={this.translate('I HAVE READ AND AGREE')}
        buttonActive={this.state.totalSelected === 3}
        buttonPress={this.onProcess}
        footer={
          <View style={{ height: 40 }} />
        }
      />
    )
  }
}

OnboardingConsent.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingConsent
