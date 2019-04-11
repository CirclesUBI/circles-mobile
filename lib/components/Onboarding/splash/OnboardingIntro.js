import React from 'react'

import PropTypes from 'prop-types'

import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

import {
  calculateWidthRatio
} from 'circles-mobile/lib/utilities/sizingHelper'
import {
  width,
  height,
  fonts
} from 'circles-mobile/lib/styles'

import { TRAVIS_BUILD_NUMBER } from 'react-native-dotenv'

const styles = StyleSheet.create({
  general: {
    fontFamily: fonts.titleText,
    color: 'white',
    textAlign: 'center'
  },
  general2: {
    fontFamily: fonts.primaryText,
    color: 'white',
    textAlign: 'center'
  }
})

const OnboardingIntro1 = (props) => (
  <View
    style={{
      width: width,
      height: height - 200,
      alignItems: 'center',
      marginTop: 20
    }}
  >
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Circles is a universal basic income based on a network of
      trust.
    </Text>
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Invite friends you know and trust into the Circles system in
      order to exchange money with them!
    </Text>
    {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
  </View>
)

const OnboardingIntro2 = (props) => (
  <View
    style={{
      width: width,
      height: height - 350,
      alignItems: 'center',
      marginTop: 20
    }}
  >
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Search for local vendors in your area that accept Circles UBI.
    </Text>
    <Text
      style={[
        {
          fontSize: 12,
          width: calculateWidthRatio(224),
          marginTop: 20
        },
        styles.general2
      ]}
    >
      Connect with people you know in the peer-to-peer marketplace, where you can offer and receive things for your Circles.
    </Text>
  </View>
)

// const OnboardingIntro3 = (props) => (
//   <View
//     style={{
//       width: width,
//       height: height - 350,
//       alignItems: 'center',
//       marginTop: 20
//     }}
//   >
//     <Text
//       style={[
//         {
//           fontSize: 12,
//           width: calculateWidthRatio(224),
//           marginTop: 20
//         },
//         styles.general2
//       ]}
//     >
//       Search for local vendors in your area that accept Circles UBI.
//     </Text>
//     <Text
//       style={[
//         {
//           fontSize: 12,
//           width: calculateWidthRatio(224),
//           marginTop: 20
//         },
//         styles.general2
//       ]}
//     >
//       Connect with people you know in the peer-to-peer marketplace, where you can offer and receive things for your Circles.
//     </Text>
//   </View>
// )

const OnboardingIntro = (props, {t: translate}) => {
  return (
    <View
      style={{
        width: width,
        height: height - 350,
        alignItems: 'center',
        marginTop: 20
      }}
    >
      <Text
        style={[
          {
            fontSize: 24,
            width: calculateWidthRatio(115),
            marginTop: 10
          },
          styles.general
        ]}
      >
        {translate('welcome to')}
      </Text>
      <Text
        style={[
          {
            fontSize: 60
          },
          styles.general
        ]}
      >
        Circles
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <OnboardingIntro1 />
        <OnboardingIntro2 />
        {/* <OnboardingIntro3 /> */}
      </ScrollView>
      {/* <Text style={[{ marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center', height: 20 }, styles.general]}>
        Build # {`${TRAVIS_BUILD_NUMBER}`}
      </Text>  */}
      <Text style={[{ marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center', height: 200 }, styles.general]}>
        Swipe to learn more
      </Text>
    </View>)
}

OnboardingIntro.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingIntro
