import * as React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import theme from '../theme';
import { ROUTENAMES } from './RouteName';
import Signin from '../scenes/Signin';
import Home from '../scenes/Home';
import Signup from '../scenes/Signup';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerBackTitle: ' ',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: theme.color.primary,
    },
    headerTintColor: '#fff',
  },
}

const NonLoggedAppRouter = createStackNavigator(
  {
    [ROUTENAMES.SIGNIN]: { screen: Signin },
    [ROUTENAMES.SIGNUP]: { screen: Signup },
  },
  defaultNavigationOptions
)

const LoggedAppRouter = createStackNavigator(
  {
    [ROUTENAMES.HOME]: { screen: Home },
  },
  defaultNavigationOptions
)

export const createRootNavigator = (token: string) =>
  createAppContainer(
    createSwitchNavigator(
      {
        [ROUTENAMES.LOGGED_APP]: LoggedAppRouter,
        [ROUTENAMES.NON_LOGGED_APP]: NonLoggedAppRouter,
      },
      {
        initialRouteName: token
          ? ROUTENAMES.LOGGED_APP
          : ROUTENAMES.NON_LOGGED_APP
      }
    )
  )
