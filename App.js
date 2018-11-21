import React from 'react'
import { Font, AppLoading } from 'expo'
import { Provider } from 'react-redux'

import { MenuProvider } from 'react-native-popup-menu'
import store from 'circles-mobile/lib/store'
import { StartNavigator } from 'circles-mobile/lib/navigators/RootNavigation'

import Amplify from 'aws-amplify'
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

import { AWS_REGION, USER_POOL_ID, USER_POOL_CLIENT_ID, API_TEST_ENDPOINT, S3_BUCKET, IDENTITY_POOL_ID } from 'react-native-dotenv'

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: AWS_REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: USER_POOL_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false

    // // OPTIONAL - Configuration for cookie storage
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - Cookie secure flag
    //     secure: true
    // },

    // OPTIONAL - customized storage object
    // storage: new MyStorage(),

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    endpoints: [
      {
        name: 'circles',
        endpoint: API_TEST_ENDPOINT
      }
    ]
  },
  Storage: {
    bucket: S3_BUCKET,
    region: AWS_REGION
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
