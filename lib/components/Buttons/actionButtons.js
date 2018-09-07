import React from 'react'
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import { primary, secondary, textColor1, fonts } from 'circles-mobile/lib/styles'

const styles = StyleSheet.create({
  actionButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: fonts.secondaryText,
    fontSize: 14,
    color: textColor1
  }
})

export default (props) =>
  (props.single
    ? (<View style={{flexDirection: 'row', flex: props.expand ? 1 : 0.32}}>
      <TouchableHighlight style={[styles.actionButtons, {backgroundColor: primary, borderRightWidth: 1}]} onPress={() => {
        props.navigation.navigate('Contacts')
      }}>
        <Text style={styles.buttonText}>ADD CONTACTS</Text>
      </TouchableHighlight>
    </View>)
    : (<View style={{flexDirection: 'row', flex: props.expand ? 1 : 0.32}}>
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
    </View>
    )
  )
