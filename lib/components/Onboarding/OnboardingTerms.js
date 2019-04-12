import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import TermsAndConditions from '../Settings/TermsAndConditions'
import { primary, width, fonts } from 'circles-mobile/lib/styles'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import { calculateHeightRatio } from 'circles-mobile/lib/utilities/sizingHelper'

const styles = StyleSheet.create({
  loginText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  loginButton: {
    width: width,
    height: calculateHeightRatio(56),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const OnboardingTerms = (props, {t: translate}) => {
  return (
    <View style={{ flex: 1 }}>
      <NavBar
        navFunction={() => props.navigation.goBack()}
        title=<Text>Terms and Conditions</Text>
      />
      <TermsAndConditions defaultPadding={false} />
      <View
        style={{ flex: 0.1, backgroundColor: 'white', flexDirection: 'row' }}
      >
        <TouchableHighlight
          style={[styles.loginButton, { backgroundColor: primary }]}
          onPress={() => {
            props.navigation.push('Avatar')
          }}
        >
          <Text style={styles.loginText}>{translate('CONTINUE')}</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

OnboardingTerms.contextTypes = {
  t: PropTypes.object
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(OnboardingTerms)
