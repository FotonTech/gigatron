import { StackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Chat from '../screens/Chat';

export const RouteNames = {
  Login: 'Login',
  SignUp: 'SignUp',
  Home: 'Home',
  Chat: 'Chat',
  Logged: 'Logged',
  NonLogged: 'NonLogged',
};

const NonLoggedAppRouter = StackNavigator(
  {
    [RouteNames.Login]: { screen: Login },
    [RouteNames.SignUp]: { screen: SignUp },
  },
  {
    initialRouteName: RouteNames.Login,
    navigationOptions: {
      header: null,
    },
  },
);

const LoggedAppRouter = StackNavigator(
  {
    [RouteNames.Home]: { screen: Home },
    [RouteNames.Chat]: { screen: Chat },
  },
  {
    initialRouteName: RouteNames.Home,
    navigationOptions: {
      header: null,
    },
  },
);

export const createRootNavigator = (token: string) =>
  createSwitchNavigator(
    {
      [RouteNames.Logged]: LoggedAppRouter,
      [RouteNames.NonLogged]: NonLoggedAppRouter,
    },
    {
      initialRouteName: token ? RouteNames.Logged : RouteNames.NonLogged,
    },
  );
