import React from 'react'
import { Platform } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createBrowserApp } from '@react-navigation/web'
import NavigationService from './utils/navigation'
import Login from './screens/Login'
import Signup from './screens/Signup'

const MainNavigator = createSwitchNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
  },
  { initialRouteName: 'Login' },
)

const AppContainer = createAppContainer(MainNavigator)

const Navigator = () => (
  <AppContainer
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)

export default (Platform.OS === 'web' ? createBrowserApp(MainNavigator) : Navigator)
