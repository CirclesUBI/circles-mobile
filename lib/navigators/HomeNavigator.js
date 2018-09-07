import { createDrawerNavigator } from 'react-navigation'
import HomeContainer from 'circles-mobile/lib/containers/HomeContainer'
import DrawerComponent from 'circles-mobile/lib/components/Drawer'
import { background2 } from 'circles-mobile/lib/styles'

const HomeNavigator = createDrawerNavigator({
  Home: {
    screen: HomeContainer
  }
}, {
  headerMode: 'none',
  contentComponent: DrawerComponent,
  drawerBackgroundColor: background2,
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
