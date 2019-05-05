import React from 'react'
import { Platform, View } from 'react-native'
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { createBrowserApp } from '@react-navigation/web'
import NavigationService from './utils/navigation'
import Login from './screens/Login'
import Signup from './screens/Signup'

let Router: () => JSX.Element = () => <View />
let navigator = Platform.OS === 'web' ? createSwitchNavigator : createStackNavigator

const MainNavigator = navigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
)

if (Platform.OS !== 'web') {
  const AppContainer = createAppContainer(MainNavigator)

  const Navigator = () => (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}
    />
  )

  Router = Navigator
} else {
  Router = createBrowserApp(MainNavigator)
}
export default Router
