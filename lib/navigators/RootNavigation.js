import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import SplashContainer from 'circles-mobile/lib/containers/SplashContainer'
import OnboardingName from 'circles-mobile/lib/components/Onboarding/OnboardingName'
import OnboardingUsername from 'circles-mobile/lib/components/Onboarding/OnboardingUsername'
import TermsConditionsScreen from 'circles-mobile/lib/components/Onboarding/OnboardingTerms'
import AvatarScreen from 'circles-mobile/lib/components/Onboarding/OnboardingAvatar'
import PhoneScreen from 'circles-mobile/lib/components/Onboarding/OnboardingPhone'
import VerifyPhoneScreen from 'circles-mobile/lib/components/Onboarding/OnboardingVerifyPhone'
import TestnetScreen from 'circles-mobile/lib/components/Onboarding/OnboardingTestnetWarning'
import CompleteScreen from 'circles-mobile/lib/components/Onboarding/OnboardingComplete'

import ConnectScreen from 'circles-mobile/lib/components/ConnectScreen' // Add Container
import WalletScreen from 'circles-mobile/lib/components/WalletScreen'
// import TransactionScreen from 'circles-mobile/lib/components/TransactionScreen'
// import ConnectContainer from 'circles-mobile/lib/containers/ConnectContainer'

import HomeDrawerNavigator from 'circles-mobile/lib/navigators/HomeNavigator'
import ValidatePhone from 'circles-mobile/lib/components/Validate/ValidatePhone'
import ValidateSuccess from 'circles-mobile/lib/components/Validate/ValidateSuccess'

import addWallet from 'circles-mobile/lib/components/AddOrgWallet/AddWallet'
import addOffer from 'circles-mobile/lib/components/AddOrgWallet/AddOffer'
import addAdmin from 'circles-mobile/lib/components/AddOrgWallet/AddAdmin'

import PayAmount from 'circles-mobile/lib/components/Pay/PayAmount'
import PayConfirm from 'circles-mobile/lib/components/Pay/PayConfirm'

import RequestAmount from 'circles-mobile/lib/components/Request/RequestAmount'
import RequestQR from 'circles-mobile/lib/components/Request/RequestQR'
import RequestConfirm from 'circles-mobile/lib/components/Request/RequestConfirm'

import OrgAddInventory from 'circles-mobile/lib/components/OrgWallet/OrgAddInventory'
import OrgWalletScreen from 'circles-mobile/lib/components/OrgWallet/OrgWalletScreen'
import OrgWalletSettings from 'circles-mobile/lib/components/OrgWallet/OrgWalletSettingsScreen'

import OrgHomeDrawerNavigator from 'circles-mobile/lib/navigators/OrgHomeNavigator'
import Contacts from 'circles-mobile/lib/components/Contacts'

import SearchScreen from 'circles-mobile/lib/containers/SearchContainer'
import Scanner from 'circles-mobile/lib/components/Scanner/Scanner'

import Tabs from 'circles-mobile/lib/components/Tabs'

export const ValidateNavigator = createStackNavigator({
  ValidatePhone: {
    screen: ValidatePhone
  },
  ValidateSuccess: {
    screen: ValidateSuccess
  }
}, {
  headerMode: 'none'
})

export const HomeNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeDrawerNavigator
  },
  WalletView: {
    screen: WalletScreen
  },
  OrgWalletView: {
    screen: OrgWalletScreen
  },
  Validate: {
    screen: ValidateNavigator
  }}, {
  headerMode: 'none'
})

export const OrgHomeNavigator = createStackNavigator({
  OrgHome: {
    screen: OrgHomeDrawerNavigator
  },
  OrgWalletView: {
    screen: OrgWalletScreen
  }}, {
  headerMode: 'none'
})

export const IntroNavigator = createStackNavigator({
  Splash: {
    screen: SplashContainer
  },
  Name: {
    screen: OnboardingName
  },
  Username: {
    screen: OnboardingUsername
  },
  Terms: {
    screen: TermsConditionsScreen
  },
  Avatar: {
    screen: AvatarScreen
  },
  Phone: {
    screen: PhoneScreen
  },
  VerifyPhone: {
    screen: VerifyPhoneScreen
  },
  Testnet: {
    screen: TestnetScreen
  },
  Complete: {
    screen: CompleteScreen
  },
  Connect: {
    screen: ConnectScreen
  }
}, {
  headerMode: 'none'
})

export const BottomTabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  OrgHomeView: OrgHomeNavigator,
  Search: SearchScreen
}, {
  headerMode: 'none',
  tabBarComponent: Tabs
})

export const OrgWalletNavigator = createStackNavigator({
  'addOrgWallet.AddWallet': {
    screen: addWallet
  },
  'addOrgWallet.AddOffer': {
    screen: addOffer
  },
  'addOrgWallet.AddAdmin': {
    screen: addAdmin
  }}, {
  headerMode: 'none'
})

export const RequestNavigator = createStackNavigator({
  'RequestAmount': {
    screen: RequestAmount
  },
  'RequestQR': {
    screen: RequestQR
  },
  'RequestContacts': {
    screen: Contacts
  },
  'RequestConfirm': {
    screen: RequestConfirm
  }}, {
  headerMode: 'none'
})

export const PayNavigator = createStackNavigator({
  'PayAmount': {
    screen: PayAmount
  },
  'PayContacts': {
    screen: Contacts
  },
  'PayConfirm': {
    screen: PayConfirm
  }}, {
  headerMode: 'none'
})

export const MainNavigator = createStackNavigator({
  Intro: {
    screen: IntroNavigator
  },
  Tabs: {
    screen: BottomTabNavigator
  },
  'addOrgWallet': {
    screen: OrgWalletNavigator
  },
  'OrgWalletSettings': {
    screen: OrgWalletSettings
  },
  OrgInventory: {
    screen: OrgAddInventory
  },
  'Pay': {
    screen: PayNavigator
  },
  'Request': {
    screen: RequestNavigator
  },
  'Contacts': {
    screen: Contacts
  },
  'Scanner': {
    screen: Scanner
  }}, {
  headerMode: 'none'
})

export const StartNavigator = createStackNavigator({
  Main: {
    screen: MainNavigator
  },
  'Scanner': {
    screen: Scanner
  }}, {
  mode: 'modal',
  headerMode: 'none'
})
