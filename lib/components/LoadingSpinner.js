import React from 'react'
import { connect } from 'react-redux'
import { primary } from 'circles-mobile/lib/styles'

import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    top: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.7
  },
  spinner: {
    margin: 'auto'
  }
})

let LoadingSpinner = ({ isLoading }) => (
  isLoading
    ? <View style={[styles.container]}>
      <ActivityIndicator style={[styles.spinner]} size='large' color={primary} />
    </View>
    : null
)

const mapStateToProps = (state) => ({isLoading: state.app.isLoading})

export default connect(mapStateToProps, null)(LoadingSpinner)
