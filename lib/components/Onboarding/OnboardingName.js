import React from 'react'
import {
  View
} from 'react-native'
import { LinearGradient } from 'expo'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import {
  primary,
  secondary,
  width
} from 'circles-mobile/lib/styles'

class OnboardingName extends React.Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LinearGradient colors={[secondary, '#160111']} style={{ flex: 1, width: width }}>
          <NavBar
            navFunction={() => this.props.navigation.goBack()}
            title={
              <View style={{
                width: width * .6,
                backgroundColor: 'white',
                height: 3,
                diplay: 'flex',
                marginTop: 5,
                flexDirection: 'horizontal',
                justifyContent: 'flex-start'
              }}>
                <View style={{
                  width: '10%',
                  backgroundColor: primary,
                  height: 3
                }} />
              </View>
            }
          />


        </LinearGradient>
      </View>
    )
  }
}

export default OnboardingName
