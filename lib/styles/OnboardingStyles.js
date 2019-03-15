import { StyleSheet } from 'react-native'
import {
  fonts
} from 'circles-mobile/lib/styles'

export default StyleSheet.create({
  buttonText: {
    fontFamily: fonts.secondaryText,
    color: 'white',
    fontSize: 14
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60,
    minHeight: 60,
    marginLeft: 30,
    marginRight: 30
  }
})
