import React from 'react'
import { Font, AppLoading } from 'expo'
import { Provider } from 'react-redux'

import { AsyncStorage } from 'react-native'

import { MenuProvider } from 'react-native-popup-menu'
import store from 'circles-mobile/lib/store'
import { StartNavigator } from 'circles-mobile/lib/navigators/RootNavigation'

import Amplify from 'aws-amplify'
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

import { AWS_REGION, USER_POOL_ID, USER_POOL_CLIENT_ID, AUTH_FLOW_TYPE, API_TEST_ENDPOINT, USER_KEY } from 'react-native-dotenv'

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: AWS_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,

    userPoolWebClientId: USER_POOL_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.joincircles.net',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - Cookie secure flag
      secure: true
    },

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: AUTH_FLOW_TYPE
  },
  API: {
    endpoints: [
      {
        name: 'circles',
        endpoint: API_TEST_ENDPOINT
      }
    ]
  }
})

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: true
    }
  }
  async componentWillMount () {
    await Font.loadAsync({
      'ostrich-sans-heavy': require('circles-mobile/assets/fonts/OstrichSans-Heavy.otf'),
      'now-alt-regular': require('circles-mobile/assets/fonts/NowAlt-Regular.otf'),
      'now-alt-medium': require('circles-mobile/assets/fonts/NowAlt-Medium.otf'),
      'now-alt-bold': require('circles-mobile/assets/fonts/NowAlt-Bold.otf')
    })
    this.setState({loading: false})
  }

  async componentDidMount () {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', user)
      if (user) {
        console.log(user)
      } else {
        console.log('no user')
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }

  render () {
    // <Provider store={store}>
    return this.state.loading
      ? <AppLoading />
      : (<Provider store={store}>
        <MenuProvider>
          <StartNavigator />
        </MenuProvider>
      </Provider>)
  }
}

export default App
