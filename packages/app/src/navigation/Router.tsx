import * as React from 'react'
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerBackTitle: ' ',
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: theme.color.headerBackground,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Poppins-Regular',
      fontWeight: '500',
    },
  },
}

const NonLoggedAppRouter = createStackNavigator(
  {
    // [ROUTENAMES.LOGIN]: { screen: Login },
    // [ROUTENAMES.SIGNUP]: { screen: SignUp },
  },
  defaultNavigationOptions
)

const LoggedAppRouter = createStackNavigator(
  {
    // [ROUTENAMES.HOME]: { screen: Home },
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
