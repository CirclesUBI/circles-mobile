import React from 'react'
import { TextInput } from 'react-native'
import { fonts } from 'circles-mobile/lib/styles'

const OnboardingTextInput = ({
  changeHandler,
  endHandler,
  label,
  placeholder,
  keyboardType
}) => {
  return (
    <TextInput
      style={{
        width: '84%',
        color: 'white',
        fontSize: 16,
        fontFamily: fonts.primaryText,
        borderBottomWidth: 1,
        marginTop: '40%',
        alignSelf: 'center',
        textAlign: 'left',
        borderColor: 'white',
        paddingBottom: 10
      }}
      onChangeText={value => changeHandler(value)} /* needs test */
      label={label}
      placeholder={placeholder}
      placeholderTextColor='white'
      autofocus
      keyboardAppearance={'dark'}
      keyboardType={keyboardType || 'default'}
      autoCapitalize='none'
      returnKeyType='next'
      onEndEditing={endHandler || (() => true)}
    />
  )
}

export default OnboardingTextInput
