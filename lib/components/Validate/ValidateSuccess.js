import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

class ValidateSuccess extends React.Component {
  render () {
    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <TouchableHighlight style={{alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 30, marginTop: 30}} onPress={() => {
          this.props.navigation.navigate('WalletView')
        }}>
          <Text>{`< Back`}</Text>
        </TouchableHighlight>
        <View>
          <Text>
            Validate Suc
          </Text>
        </View>
      </View>
    )
  }
}

export default ValidateSuccess
