import ReactNative, { Keyboard } from 'react-native'
import React from 'react'
import KeyboardAwareBase from '../KeyboardAwareBase'
import renderer from 'react-test-renderer'

describe('KeyboardAwareBase', () => {
  // 75,83
  it('renders the KeyboardAwareBase', () => {
    // const tree = renderer.create(
    //   <KeyboardAwareBase
    //     />
    // ).toJSON()
    // expect(tree).toMatchSnapshot()
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = {scrollTo: () => true}
  })
  // it('calls to scrollToBottom if no contentSize', () => {
  //   const setTimeout = jest.fn()
  //   const KeyboardAwareBaseInstance = new KeyboardAwareBase()
  //   KeyboardAwareBaseInstance._keyboardAwareView = { scrollTo: jest.fn() }
  //   KeyboardAwareBaseInstance.scrollToBottom()
  //   // expect(setTimeout).toHaveBeenCalled()
  // })
  it('addsKeyboardEventListeners', () => {
    const listener = jest.fn()
    Keyboard.addListener = listener
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()

    KeyboardAwareBaseInstance._addKeyboardEventListeners()
    expect(listener).toHaveBeenCalledTimes(2)
  })
  it('calls removeKeyboardListeners', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    const remove = jest.fn()
    KeyboardAwareBaseInstance.keyboardEventListeners = [{remove: remove}]
    KeyboardAwareBaseInstance._removeKeyboardListeners()
    // expect(KeyboardAwareBaseInstance.keyboardEventListeners.forEach).toHaveBeenCalled()
    expect(remove).toHaveBeenCalled()
  })
  it('calls componentWillMount', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._addKeyboardEventListeners = jest.fn()
    KeyboardAwareBaseInstance.componentWillMount()
    expect(KeyboardAwareBaseInstance._addKeyboardEventListeners).toHaveBeenCalled()
  })
  it('calls componentDidMount', () => {
    jest.useFakeTimers()
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = { setNativeProps: jest.fn() }
    KeyboardAwareBaseInstance.props = { startScrolledToBottom: true }
    KeyboardAwareBaseInstance.scrollToBottom = jest.fn()
    KeyboardAwareBaseInstance.componentDidMount()
    expect(KeyboardAwareBaseInstance.scrollToBottom).toHaveBeenCalled()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.setNativeProps).not.toBeCalled()
    jest.runAllTimers()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.setNativeProps).toHaveBeenCalled()
  })
  it('calls _onKeyboardAwareViewLayout', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = {}
    KeyboardAwareBaseInstance._updateKeyboardAwareViewContentSize = jest.fn()
    KeyboardAwareBaseInstance._onKeyboardAwareViewLayout(60)
    expect(KeyboardAwareBaseInstance._updateKeyboardAwareViewContentSize).toHaveBeenCalled()
  })
  it('calls _onKeyboardAwareViewScroll', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = {}
    KeyboardAwareBaseInstance._updateKeyboardAwareViewContentSize = jest.fn()
    KeyboardAwareBaseInstance._onKeyboardAwareViewScroll(60)
    expect(KeyboardAwareBaseInstance._updateKeyboardAwareViewContentSize).toHaveBeenCalled()
  })
  it('calls componentWillUnmount', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._removeKeyboardListeners = jest.fn()
    KeyboardAwareBaseInstance.componentWillUnmount()
    expect(KeyboardAwareBaseInstance._removeKeyboardListeners).toHaveBeenCalled()
  })
  it('calls _scrollToFocusedTextInput', () => {
    jest.useFakeTimers()
    ReactNative.findNodeHandle = jest.fn()
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance.props = { getTextInputRefs: jest.fn(() => [{isFocused: () => () => false}]) }
    KeyboardAwareBaseInstance._keyboardAwareView = {getScrollResponder: jest.fn(() => { return { scrollResponderScrollNativeHandleToKeyboard: jest.fn() } })}
    KeyboardAwareBaseInstance._scrollToFocusedTextInput()
    expect(KeyboardAwareBaseInstance.props.getTextInputRefs).toHaveBeenCalled()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.getScrollResponder).not.toBeCalled()
    // jest.runAllTimers()
    // expect(KeyboardAwareBaseInstance._keyboardAwareView.getScrollResponder).toHaveBeenCalled()

    // expect(KeyboardAwareBaseInstance._keyboardAwareView.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard).toHaveBeenCalled()
  })

  it('returns if keyboardHeight is === to newKeyboardHeight', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._scrollToFocusedTextInput = jest.fn()
    const event = { endCoordinates: { height: 60 } }
    KeyboardAwareBaseInstance.state.keyboardHeight = 60
    KeyboardAwareBaseInstance.setState = jest.fn()
    KeyboardAwareBaseInstance.props = { scrollToBottomOnKBShow: true }
    KeyboardAwareBaseInstance.scrollToBottom = jest.fn()
    KeyboardAwareBaseInstance._onKeyboardWillShow(event)

    expect(KeyboardAwareBaseInstance._scrollToFocusedTextInput).toHaveBeenCalled()
    expect(KeyboardAwareBaseInstance.setState).toHaveBeenCalledTimes(0)
    expect(KeyboardAwareBaseInstance.scrollToBottom).toHaveBeenCalledTimes(0)
  })
  it('calls to onKeyboardWillShow', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._scrollToFocusedTextInput = jest.fn()
    const event = { endCoordinates: { height: 60 } }
    KeyboardAwareBaseInstance.state.keyboardHeight = 40
    KeyboardAwareBaseInstance.setState = jest.fn()
    KeyboardAwareBaseInstance.props = { scrollToBottomOnKBShow: true }
    KeyboardAwareBaseInstance.scrollToBottom = jest.fn()
    KeyboardAwareBaseInstance._onKeyboardWillShow(event)

    expect(KeyboardAwareBaseInstance._scrollToFocusedTextInput).toHaveBeenCalled()
    expect(KeyboardAwareBaseInstance.setState).toHaveBeenCalled()
    expect(KeyboardAwareBaseInstance.scrollToBottom).toHaveBeenCalled()
  })
  it('calls to onKeyboardWillHide if contentSize', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance.state.keyboardHeight = 60
    KeyboardAwareBaseInstance.setState = jest.fn()
    KeyboardAwareBaseInstance._keyboardAwareView = { scrollTo: jest.fn(), contentOffset: {y: 40}, contentSize: {height: 80}, layout: 30, props: { contentInset: { bottom: 10 } } }
    KeyboardAwareBaseInstance._onKeyboardWillHide()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.scrollTo).toHaveBeenCalled()
  })
  it('calls to scrollBottomOnNextSizeChange', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance.scrollBottomOnNextSizeChange()
    expect(KeyboardAwareBaseInstance.state.scrollBottomOnNextSizeChange).toEqual(true)
  })
  it('calls to scrollToBottom if contentSize', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = { scrollTo: jest.fn(), contentSize: {height: 80}, layout: 30, props: { contentInset: { bottom: 10 } } }
    KeyboardAwareBaseInstance.scrollToBottom()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.scrollTo).toHaveBeenCalled()
  })
  it('calls to scrollToBottom if no contentSize', () => {
    jest.useFakeTimers()
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = { scrollTo: jest.fn(), contentSize: false, layout: 30, props: { contentInset: { bottom: 10 } } }
    KeyboardAwareBaseInstance.scrollToBottom = jest.fn(() => KeyboardAwareBaseInstance.scrollToBottom)
    expect(KeyboardAwareBaseInstance.scrollToBottom).not.toHaveBeenCalled()
  })
  it('calls to scrollTo', () => {
    const KeyboardAwareBaseInstance = new KeyboardAwareBase()
    KeyboardAwareBaseInstance._keyboardAwareView = {scrollTo: jest.fn()}
    KeyboardAwareBaseInstance.scrollTo()
    expect(KeyboardAwareBaseInstance._keyboardAwareView.scrollTo).toHaveBeenCalled()
  })
})
