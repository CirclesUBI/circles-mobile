import React from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native'
import {
  calculateWidthRatio,
  calculateHeightRatio
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
  }
})

export default (props) => {
  let dialingCode = props.dialingCode
  let formattedPhone = ''

  if (props.phone) {
    formattedPhone = props.phone.substring(dialingCode.length - 1)
    if (formattedPhone.length !== 0) {
      formattedPhone = (+formattedPhone)
    }
  }
  return (
    <View
      style={{
        width: width,
        height: height - 100,
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
        PHONE
      </Text>
      <TextInput
        onChangeText={value => props.handlePhoneChange(value)} /* needs test */
        value={'(' + dialingCode + ') ' + formattedPhone}
        keyboardType={'phone-pad'}
        label='Mobile Number'
        placeholder='Enter your mobile number'
        placeholderTextColor={'#FFFFFF'}
        autofocus
        underlineColorAndroid={'#FFFFFF'}
        returnKeyType='next'
        onSubmitEditing={() => {
          // validNumber && this.onProcess()
          // this.onProcess()
        }
        } /* needs test */
        style={{
          height: calculateHeightRatio(40),
          width: calculateWidthRatio(285),
          color: '#CECECE',
          fontSize: 16,
          fontFamily: fonts.primaryText,
          borderBottomWidth: 1,
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          borderColor: 'rgba(58,59,78,49)'
        }}
      />
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
        PASSWORD
      </Text>
      <TextInput
        onChangeText={value => props.handlePasswordChange(value)} /* needs test */
        value={props.password}
        label='Password'
        secureTextEntry
        placeholder='Enter your password'
        placeholderTextColor={'#FFFFFF'}
        autofocus
        underlineColorAndroid={'#FFFFFF'}
        returnKeyType='next'
        onSubmitEditing={() => {
          // validNumber && this.onProcess()
          // this.onProcess()
        }
        } /* needs test */
        style={{
          height: calculateHeightRatio(40),
          width: calculateWidthRatio(285),
          color: '#CECECE',
          fontSize: 16,
          fontFamily: fonts.primaryText,
          borderBottomWidth: 1,
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          borderColor: 'rgba(58,59,78,49)'
        }}
      />
      <Text
        style={[
          {
            fontSize: 24,
            width: calculateWidthRatio(115)
          },
          styles.general
        ]}
      >
        CODE
      </Text>
      <TextInput
        onChangeText={value => props.handleCodeChange(value)} /* needs test */
        value={props.code}
        label='Code'
        placeholder='Enter your verification code.'
        placeholderTextColor={'#FFFFFF'}
        autofocus
        underlineColorAndroid={'#FFFFFF'}
        returnKeyType='next'
        onSubmitEditing={() => {
          // validNumber && this.onProcess()
          // this.onProcess()
        }
        } /* needs test */
        style={{
          height: calculateHeightRatio(40),
          width: calculateWidthRatio(285),
          color: '#CECECE',
          fontSize: 16,
          fontFamily: fonts.primaryText,
          borderBottomWidth: 1,
          marginTop: 10,
          alignSelf: 'center',
          textAlign: 'center',
          borderColor: 'rgba(58,59,78,49)'
        }}
      />
    </View>
  )
}
