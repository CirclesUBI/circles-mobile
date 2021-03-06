import React from 'react'
import { TextInput } from 'react-native'
import { fonts } from 'circles-mobile/lib/styles'

const OnboardingTextInput = (props) => {
  return (
    <TextInput
      {...props}
      style={[{
        width: '84%',
        color: 'white',
        fontSize: 16,
        fontFamily: fonts.primaryText,
        borderBottomWidth: 1,
        marginTop: '45%',
        alignSelf: 'center',
        textAlign: 'left',
        borderColor: 'white',
        paddingBottom: 10
      }, { ...props.style }]}
      onChangeText={value => props.changeHandler(value)} /* needs test */
      label={props.label}
      placeholder={props.placeholder}
      placeholderTextColor='white'
      autofocus
      keyboardAppearance={'dark'}
      autoCapitalize='none'
      returnKeyType='next'

    />
  )
}

export default OnboardingTextInput
