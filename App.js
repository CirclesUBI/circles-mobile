import React from 'react'
import { Font, AppLoading } from 'expo'
import { Provider } from 'react-redux'

import { MenuProvider } from 'react-native-popup-menu'
import store from 'circles-mobile/lib/store'
import { StartNavigator } from 'circles-mobile/lib/navigators/RootNavigation'
import NavigationService from 'circles-mobile/lib/navigators/NavigationService'

import LoadingSpinner from 'circles-mobile/lib/components/LoadingSpinner'

import Amplify from 'aws-amplify'

import { AWS_REGION, USER_POOL_ID, USER_POOL_CLIENT_ID, API_USER_ENDPOINT, API_RELAYER_ENDPOINT, API_ORG_ENDPOINT, S3_BUCKET, IDENTITY_POOL_ID } from 'react-native-dotenv'

import I18n from 'redux-i18n'

import {translations} from 'circles-mobile/i18n/translations'

const logger = new Amplify.Logger('App')

global.self = global
global.Buffer = global.Buffer || require('buffer').Buffer

Amplify.Logger.LOG_LEVEL = process.env.LOG_LEVEL || 'INFO'
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
  },
  API: {
    endpoints: [
      {
        name: 'users',
        endpoint: API_USER_ENDPOINT
      },
      {
        name: 'relayer',
        endpoint: API_RELAYER_ENDPOINT
      },
      {
        name: 'orgs',
        endpoint: API_ORG_ENDPOINT
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
    logger.info('Initializing ...')
  }
  async componentWillMount () {
    await Font.loadAsync({
      'ostrich-sans-heavy': require('circles-mobile/assets/fonts/OstrichSans-Heavy.otf'),
      'now-alt-regular': require('circles-mobile/assets/fonts/NowAlt-Regular.otf'),
      'now-alt-medium': require('circles-mobile/assets/fonts/NowAlt-Medium.otf'),
      'now-alt-bold': require('circles-mobile/assets/fonts/NowAlt-Bold.otf')
    })
    this.setState({ loading: false })
    logger.info('Mounted')
  }

  render () {
    return this.state.loading
      ? <AppLoading />
      : (<Provider store={store}>
        <I18n translations={translations} initialLang="en">
          <MenuProvider>
            <LoadingSpinner />
            <StartNavigator
              // persistenceKey={'NavigationState'}
              ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
              // renderLoadingExperimental={() => <LoadingSpinner />}
            />
          </MenuProvider>
        </I18n>
      </Provider>)
  }
}

export default App
