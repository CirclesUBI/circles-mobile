// NavigationService.js - https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html

import { NavigationActions, StackActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef
}

function navigate (routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function resetFromTo (currRoute, routeName, params) {
  _navigator.dispatch(StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({
      routeName: currRoute,
      action: NavigationActions.navigate({routeName: routeName})
    })]
  }))
}

// add other navigation functions that you need and export them

export default {
  navigate,
  resetFromTo,
  setTopLevelNavigator
}
