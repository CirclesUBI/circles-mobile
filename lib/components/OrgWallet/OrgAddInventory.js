import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableHighlight } from 'react-native'

const OrgAddInventory = (props, {t: translate}) => (
  <View>
    <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
      props.navigation.navigate('OrgWalletView')
    }}>
      <Text>{translate('< Back')}</Text>
    </TouchableHighlight>
    <Text>{translate('OrgInventory')}</Text>
  </View>
)

OrgAddInventory.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OrgAddInventory
