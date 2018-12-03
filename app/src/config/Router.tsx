import { StackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import AddPet from '../screens/AddPet';
import Pet from '../screens/Pet';

export const RouteNames = {
  Login: 'Login',
  SignUp: 'SignUp',
  Home: 'Home',
  AddPet: 'AddPet',
  Pet: 'Pet',
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
    [RouteNames.AddPet]: { screen: AddPet },
    [RouteNames.Pet]: { screen: Pet },
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
