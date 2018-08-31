import { ScrollView } from 'react-native'
import React from 'react'
import KeyboardAwareScrollView from '../KeyboardAwareScrollView'
import renderer from 'react-test-renderer'
// 21,22,26,42
describe('KeyboardAwareScrollView', () => {
  it('renders the KeyboardAwareScrollView', () => {
    const tree = renderer.create(
      <KeyboardAwareScrollView
        dataSource={{rowIdentities: []}}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onKeyboardAwareViewLayout from onLayout', () => {
    this.wrapper = global.shallow(
      <KeyboardAwareScrollView
        dataSource={{rowIdentities: []}}
        />
    )
    const instance = this.wrapper.instance()
    instance._onKeyboardAwareViewLayout = jest.fn()
    this.wrapper.find(ScrollView).props().onLayout({nativeEvent: true})
    expect(instance._onKeyboardAwareViewLayout).toHaveBeenCalled()
  })
  it('calls onKeyboardAwareViewScroll from onScroll', () => {
    const onScroll = jest.fn()
    this.wrapper = global.shallow(
      <KeyboardAwareScrollView
        dataSource={{rowIdentities: []}}
        onScroll={onScroll}
        />
    )
    const instance = this.wrapper.instance()
    instance._onKeyboardAwareViewScroll = jest.fn()
    this.wrapper.find(ScrollView).props().onScroll({nativeEvent: true})
    expect(instance._onKeyboardAwareViewScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalled()
  })
  it('calls updateKeyboardAwareViewContentSize from onContentSizeChange', () => {
    this.wrapper = global.shallow(
      <KeyboardAwareScrollView
        dataSource={{rowIdentities: []}}
        />
    )
    const instance = this.wrapper.instance()
    instance._updateKeyboardAwareViewContentSize = jest.fn()
    this.wrapper.find(ScrollView).props().onContentSizeChange()
    expect(instance._updateKeyboardAwareViewContentSize).toHaveBeenCalled()
  })
  it('returns an empty array from getTextInputRefs', () => {
    this.wrapper = global.shallow(
      <KeyboardAwareScrollView
        dataSource={{rowIdentities: []}}
        />
    )
    expect(this.wrapper.props().getTextInputRefs()).toEqual([])
  })
})
