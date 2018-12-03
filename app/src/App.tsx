// @flow
import React, { Component, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { createRootNavigator } from './config/Router';
import { images } from './assets/index';
import styled, { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import client from './config/ApolloEnv';
import theme from './config/theme';

console.disableYellowBox = true;

const LoadingWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.primaryBackground};
`;

const WelcomeText = styled.Text`
  font-size: 83;
`;

const Zap = () => (
  <WelcomeText>⚡</WelcomeText>
)

type Props = {};

type State = {
  token: string,
  loading: boolean,
};

class App extends Component<Props, State> {
  state = {
    token: '',
    loading: true,
  };

  componentDidMount() {
    AsyncStorage.clear();
    setTimeout(() => {
      AsyncStorage.getItem('token').then(value => {
        this.setState({
          loading: false,
          token: value,
        });
      });
    }, 1000);
  }
  render() {
    const { token, loading } = this.state;

    const Router = createRootNavigator(token);

    if (loading) {
      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <LoadingWrapper>
              <Zap />
            </LoadingWrapper>
          </ApolloProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default App;
