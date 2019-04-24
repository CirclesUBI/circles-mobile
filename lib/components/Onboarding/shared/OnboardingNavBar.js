import React from 'react'
import { NavigationActions, StackActions } from 'react-navigation'
import NavBar from 'circles-mobile/lib/components/shared/Navbar'
import Progress from 'circles-mobile/lib/components/shared/Progress'

const OnboardingNavBar = ({
  navigation,
  progressAmount
}) => (
  <NavBar
    navFunction={() => navigation.goBack()}
    title={
      <Progress amount={progressAmount} />
    }
    closeFunction={() => navigation.dispatch(StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({
        routeName: 'Main',
        action: NavigationActions.navigate({
          routeName: 'Intro',
          action: NavigationActions.navigate({
            routeName: 'Splash'
          })
        })
      })]
    }))}
  />
)

export default OnboardingNavBar
