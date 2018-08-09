import React from 'react'
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import { primary, secondary, textColorMain } from 'circles-mobile/lib/styles/styles'

const styles = StyleSheet.create({
  sectionHeading: {
    fontFamily: 'now-alt-bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 14
  },
  actionButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'now-alt-medium',
    fontSize: 14,
    color: textColorMain
  }
})

export default (props) =>
  (<View style={{flexDirection: 'row', flex: 0.08}}>
    <TouchableHighlight style={[styles.actionButtons, {backgroundColor: primary, borderRightWidth: 1}]} onPress={() => {
      props.navigation.navigate('Contacts')
    }}>
      <Text style={styles.buttonText}>ADD CONTACTS</Text>
    </TouchableHighlight>
    <TouchableHighlight style={[styles.actionButtons, {backgroundColor: secondary}]} onPress={() => {
      props.navigation.navigate('Validate')
    }}>
      <Text style={styles.buttonText}>GET VALIDATED</Text>
    </TouchableHighlight>
  </View>)
