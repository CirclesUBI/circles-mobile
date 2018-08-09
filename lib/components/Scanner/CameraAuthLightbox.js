import React from 'react'
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'

class CameraAuthLightbox extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 6, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex: 2}}>
            <Text>{this.props.title}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.content}>{this.props.content}</Text>
          </View>
        </View>

        <View style={{flex: 3, flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', flex: 4, flexGrow: 4}}>
            <View style={{flex: 1}}>
              { Platform.OS === 'ios'
                ? <View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      title={'Update'}
                      style={{padding: 8}}
                      onPress={() => Linking.openURL('app-settings:')}
                      color='rgba(0,0,0,0)' >
                      <Text>Update</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.buttonContainer, {marginTop: 10}]}>
                    <TouchableOpacity
                      title={'Close'}
                      style={{padding: 8}}
                      onPress={() => this.props.onClose()}
                      color='rgba(0,0,0,0)' >
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                : <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    title={'Close'}
                    onPress={() => this.props.onClose()}
                    color='rgba(0,0,0,0)' >
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get('window').width * 0.8,
    maxHeight: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 0.2,
    flexDirection: 'column',
    flex: 1
  },
  buttonContainer: {
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5
  },
  title: {
    fontSize: 17,
    fontWeight: '700'
  },
  content: {

  }
})

export default CameraAuthLightbox
