import React, { Component } from 'react';
import { AsyncStorage, View, Linking, Platform } from 'react-native';
import { createRootNavigator } from './navigation/Router';

// Styled
import { ThemeProvider } from 'styled-components'
import theme from './theme'

interface State {
  token: string
  isTokenRetrieved: boolean
}

export default class App extends Component<State> {
  public state = {
    token: '',
    isTokenRetrieved: false
  }

  public componentDidMount() {
    AsyncStorage.clear()
    AsyncStorage.getItem('userToken').then((value: any) => {
      this.setState({
        token: value,
        isTokenRetrieved: true,
      })
    })
  }

  public render() {
    const { isTokenRetrieved, token } = this.state

    const Launch = createRootNavigator(token)

    return (
      <ThemeProvider theme={theme}>
        {isTokenRetrieved ? <Launch /> : <View />}
      </ThemeProvider>
    )
  }
}
