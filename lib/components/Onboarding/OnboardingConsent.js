// Frameworks
import React from 'react'
import {
  Image,
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import { LinearGradient } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import NextButton from 'circles-mobile/lib/components/shared/Onboarding/NextButton'

// Styles
import {
  fonts,
  textColor1,
  primary,
  secondary,
  width
} from 'circles-mobile/lib/styles'

export class OnboardingConsent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {
        0: false,
        1: false,
        2: false
      },
      totalSelected: 0
    }

    this.onContinue = this.onContinue.bind(this)
  }

  onContinue () {
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
      'Research consent form you know and trust into the Circles system in order to exchange money with them!',
      'Privacy policy know and trust into the Circles system in order to exchange money with them!',
      'Invite friends you know and trust into the Circles system in order to exchange money with them!'
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
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='100%' />
            }
            closeFunction={() => this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({
                routeName: 'Main',
                action: NavigationActions.navigate({
                  routeName: 'Intro',
                  action: NavigationActions.navigate({
                    routeName: 'Splash'
                  })
                })
              })]
            }))}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontFamily: fonts.titleText,
                    marginTop: '10%'
                  }}
                >
                  SOME THINGS FOR REVIEW
                </Text>
                <View style={{alignItems: 'center'}}>
                  {text}
                </View>

                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '80%', marginTop: 30, alignSelf: 'center' }}>
                  {mnemonic}
                </View> */}

              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <NextButton active={this.state.totalSelected === 3} onPress={this.onContinue} />
            </View>
          </View>
        </LinearGradient>
      </View>
    )
  }
}

export default OnboardingConsent
