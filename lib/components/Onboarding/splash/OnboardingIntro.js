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

const OnboardingIntro1 = (props, {t: translate}) => (
  <View
    style={{
      width: width,
      alignItems: 'center'
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
      {translate('Circles is a universal basic income based on a network of trust.')}
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
      {translate('Invite friends you know and trust into the Circles system in order to exchange money with them!')}
    </Text>
    {/* <Text style={[{marginTop: 20, fontSize: 12, color: 'white', textAlign: 'center'}, styles.general]}>Swipe to learn more</Text> */}
  </View>
)

OnboardingIntro1.contextTypes = {
  t: PropTypes.func.isRequired
}

const OnboardingIntro2 = (props, {t: translate}) => (
  <View
    style={{
      width: width,
      alignItems: 'center'
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
      {translate('Search for local vendors in your area that accept Circles UBI.')}
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
      {translate('Connect with people you know in the peer-to-peer marketplace, where you can offer and receive things for your Circles.')}
    </Text>
  </View>
)

OnboardingIntro2.contextTypes = {
  t: PropTypes.func.isRequired
}

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
        alignItems: 'center'
      }}
    >
      <Text
        style={[
          {
            fontSize: 24,
            width: calculateWidthRatio(115)
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
        {/* <Text
          style={[
            {
              fontSize: 60
            },
            styles.general
          ]}
        >
          Circles
        </Text> */}
        <OnboardingIntro1 />
        <OnboardingIntro2 />
      </ScrollView>
      {/* <Text style={[{ marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center', height: 20 }, styles.general]}>
        Build # {`${TRAVIS_BUILD_NUMBER}`}
      </Text>  */}
      <Text style={[{ marginTop: 20, fontSize: 16, color: 'white', textAlign: 'center', height: 200 }, styles.general]}>
        {translate('Swipe to learn more')}
      </Text>
    </View>)
}

OnboardingIntro.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OnboardingIntro
