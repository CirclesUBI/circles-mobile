import { ListView } from 'react-native'
import React from 'react'
import KeyboardAwareListView from '../KeyboardAwareListView'
import renderer from 'react-test-renderer'

describe('KeyboardAwareListView', () => {
  it('renders the KeyboardAwareListView', () => {
    const tree = renderer.create(
      <KeyboardAwareListView
        dataSource={{rowIdentities: []}}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onKeyboardAwareViewLayout from onLayout', () => {
    this.wrapper = global.shallow(
      <KeyboardAwareListView
        dataSource={{rowIdentities: []}}
        />
    )
    const instance = this.wrapper.instance()
    instance._onKeyboardAwareViewLayout = jest.fn()
    this.wrapper.find(ListView).props().onLayout({nativeEvent: true})
    expect(instance._onKeyboardAwareViewLayout).toHaveBeenCalled()
  })
  it('calls onKeyboardAwareViewScroll from onScroll', () => {
    const onScroll = jest.fn()
    this.wrapper = global.shallow(
      <KeyboardAwareListView
        dataSource={{rowIdentities: []}}
        onScroll={onScroll}
        />
    )
    const instance = this.wrapper.instance()
    instance._onKeyboardAwareViewScroll = jest.fn()
    this.wrapper.find(ListView).props().onScroll({nativeEvent: true})
    expect(instance._onKeyboardAwareViewScroll).toHaveBeenCalled()
    expect(onScroll).toHaveBeenCalled()
  })
  it('calls updateKeyboardAwareViewContentSize from onContentSizeChange', () => {
    this.wrapper = global.shallow(
      <KeyboardAwareListView
        dataSource={{rowIdentities: []}}
        />
    )
    const instance = this.wrapper.instance()
    instance._updateKeyboardAwareViewContentSize = jest.fn()
    this.wrapper.find(ListView).props().onContentSizeChange()
    expect(instance._updateKeyboardAwareViewContentSize).toHaveBeenCalled()
  })
})
