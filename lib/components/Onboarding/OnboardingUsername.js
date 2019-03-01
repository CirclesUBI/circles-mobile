import React from 'react'
import {
  View,
  TextInput,
  TouchableHighlight,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'
import {
  primary,
  secondary,
  width,
  fonts
} from 'circles-mobile/lib/styles'
import OnboardingStyles from 'circles-mobile/lib/styles/OnboardingStyles'
import {
  calculateWidthRatio
} from 'circles-mobile/lib/utilities/sizingHelper'

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
  }

  onProcess () {
    this.props.addOnboardingData({ username: this.state.username })
    this.props.navigation.push('Username')
  }

  handleChange (username) {
    this.setState({ username })
  }

  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <Progress amount='20%' />
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
          <TextInput
            style={{
              width: calculateWidthRatio(285),
              color: 'white',
              fontSize: 16,
              fontFamily: fonts.primaryText,
              borderBottomWidth: 1,
              marginTop: '40%',
              alignSelf: 'center',
              textAlign: 'left',
              borderColor: 'white',
              paddingBottom: 10
            }}
            onChangeText={value => this.handleChange(value)} /* needs test */
            label='Name'
            placeholder='Username'
            placeholderTextColor='white'
            autofocus
            keyboardAppearance={'dark'}
          />
          {this.state.username ? (
            <View style={{ flex: 0.1, backgroundColor: 'white', marginLeft: 30, marginRight: 30, marginTop: 50 }}>
              <TouchableHighlight
                style={[OnboardingStyles.button, { backgroundColor: primary }]}
                onPress={this.onProcess}
              >
                <Text style={[OnboardingStyles.buttonText, { textAlign: 'center' }]}>
                  CONTINUE
                </Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </LinearGradient>
      </View>
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
