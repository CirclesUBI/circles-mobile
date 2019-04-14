import React from 'react'
import PropTypes from 'prop-types'
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

const ActionButtons = (props, {t: translate}) =>
  (props.single
    ? (<View style={{flexDirection: 'row', flex: props.expand ? 1 : 0.32}}>
      <TouchableHighlight style={[styles.actionButtons, {backgroundColor: primary, borderRightWidth: 1}]} onPress={() => {
        props.navigation.navigate('Contacts')
      }}>
        <Text style={styles.buttonText}>{translate('ADD CONTACTS')}</Text>
      </TouchableHighlight>
    </View>)
    : (<View style={{flexDirection: 'row', flex: props.expand ? 1 : 0.32}}>
      <TouchableHighlight style={[styles.actionButtons, {backgroundColor: primary, borderRightWidth: 1}]} onPress={() => {
        props.navigation.navigate('Contacts')
      }}>
        <Text style={styles.buttonText}>{translate('ADD CONTACTS')}</Text>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.actionButtons, {backgroundColor: secondary}]} onPress={() => {
        props.navigation.navigate('Validate')
      }}>
        <Text style={styles.buttonText}>{translate('GET VALIDATED')}</Text>
      </TouchableHighlight>
    </View>
    )
  )

  ActionButtons.contextTypes = {
    t: PropTypes.func.isRequired
  }

  export default ActionButtons
