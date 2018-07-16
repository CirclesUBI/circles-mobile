import { Dimensions } from 'react-native'

export const calculateHeightRatio = (value) => {
  const height = Dimensions.get('window').height
  return value / 672 * height
}

export const calculateWidthRatio = (value) => {
  const width = Dimensions.get('window').width
  return value / 375 * width
}
