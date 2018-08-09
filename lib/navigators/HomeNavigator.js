import { createDrawerNavigator } from 'react-navigation'
import HomeContainer from 'circles-mobile/lib/containers/HomeContainer'
import DrawerComponent from 'circles-mobile/lib/components/Drawer'
import { mediumDarkBackground } from 'circles-mobile/lib/styles/styles'

const HomeNavigator = createDrawerNavigator({
  Home: {
    screen: HomeContainer
  }
}, {
  headerMode: 'none',
  contentComponent: DrawerComponent,
  drawerBackgroundColor: mediumDarkBackground,
  contentOptions: {
    items: ['Home', 'Splash'],
    activeTintColor: '#FFFFFF',
    itemsContainerStyle: {
      marginVertical: 0
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
})

export default HomeNavigator
