import { createDrawerNavigator } from 'react-navigation'
import OrgHomeContainer from 'circles-mobile/lib/containers/OrgHomeContainer'
import DrawerComponent from 'circles-mobile/lib/components/Drawer'
import { mediumDarkBackground } from 'circles-mobile/lib/styles/styles'

const OrgHomeNavigator = createDrawerNavigator({
  Home: {
    screen: OrgHomeContainer
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

export default OrgHomeNavigator
