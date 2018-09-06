// Frameworks
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'

// Utilities
// import { getInitials } from 'uPortMobile/lib/utilities/getInitials'

// Styles
import {fonts, textColor3, secondary} from 'circles-mobile/lib/styles'

// Constants
const anon = require('circles-mobile/images/default_profile_image.png')
const defaultSize = 70

const styles = {
  avatar: {
    borderRadius: defaultSize / 2,
    width: defaultSize,
    height: defaultSize
  },
  initialContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initials: {
    fontFamily: fonts.boldText,
    fontSize: defaultSize / 4,
    textAlign: 'center'
  },
  wrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundedSquareWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc'
  },
  roundedSquareImage: {
    resizeMode: 'contain'
  }
}

const avatarSize = (props) => {
  const size = props.size || defaultSize
  return {
    ...styles.avatar,
    borderRadius: size / 2,
    width: size,
    height: size
  }
}

const avatarBorder = (props) => {
  // console.log(props)
  const borderWidth = props.borderWidth || 1
  const borderColor = props.borderColor || textColor3
  const backgroundColor = props.borderColor || secondary
  const size = (props.size || defaultSize) + borderWidth * 2
  return {
    borderColor,
    borderWidth,
    backgroundColor,
    padding: borderWidth,
    borderRadius: size / 2,
    width: size,
    height: size
  }
}

// Components
const ImageReplacement = (props) => (
  <View style={[
    styles.initialContainer,
    avatarSize(props),
    {backgroundColor: secondary},
    {padding: (props.size || defaultSize) / 4}
  ]}>
    <Text style={[styles.initials, props.initialsStyle, {fontSize: (props.size || defaultSize) / 4, color: 'white'}]}>
      { props.text }
    </Text>
  </View>
)

const SquareThumbnail = (props) => (
  <View style={[styles.roundedSquareWrapper, {height: props.size, width: props.size}]}>
    <Image style={[styles.roundedSquareImage, {height: props.size * 1.35, width: props.size * 1.35}]} source={props.source} />
  </View>
)

const Thumbnail = (props) => (
  <View style={[styles.wrapper, avatarBorder(props)]}>
    <Image
      resizeMode='cover'
      source={props.source}
      style={[avatarSize(props), {position: 'absolute'}, props.style]} />
    {props.children}
  </View>
)

const Avatar = (props) => (
  <View>
    {
      props.source
        ? props.source.avatar
          ? props.square
            ? (
              <SquareThumbnail
                size={props.size || defaultSize}
                source={props.source.avatar}
                style={[avatarSize(props), props.style]}>
                {props.children}
              </SquareThumbnail>
            )
            : (
              <Thumbnail
                size={props.size || defaultSize}
                borderColor={props.borderColor}
                borderWidth={props.borderWidth}
                source={props.source.avatar}
                style={[avatarSize(props), props.style]}>
                {props.children}
              </Thumbnail>
            )
          : (props.source.uri
            ? (
              <Thumbnail
                size={props.size || defaultSize}
                source={props.source}
                borderColor={props.borderColor}
                borderWidth={props.borderWidth}
                style={[avatarSize(props), props.style]}>
                {props.children}
              </Thumbnail>)
            : (
              props.source.name
                ? (
                  <ImageReplacement
                    initialsStyle={props.initialsStyle}
                    size={props.size}
                    text={''} />
                )
                : (
                  <ImageReplacement
                    initialsStyle={props.initialsStyle}
                    size={props.size}
                    text={''} />
                )
            )
          )
        : (
          <Thumbnail
            size={props.size || defaultSize}
            source={anon}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
            style={[avatarSize(props), props.style]} />
        )
    }
  </View>
)

Avatar.propTypes = {
  size: PropTypes.number,
  source: PropTypes.object
}

export default Avatar
