import React from 'react'
import { View, Platform } from 'react-native'
import styled from 'styled-components'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createBrowserApp } from '@react-navigation/web'
import Button from './components/Button'
import { ApolloProvider } from 'react-apollo'
import client from './apollo'

const App = () => (
  <ApolloProvider client={client}>
    <Wrapper>
      <Button text='Login' />
      <Button text='Signup' />
    </Wrapper>
  </ApolloProvider>
)

const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`

const rootNavigator = createStackNavigator(
  {
    Login: { screen: App },
  },
  { initialRouteName: 'Login' },
)

export default (Platform.OS === 'web'
  ? createBrowserApp(rootNavigator)
  : createAppContainer(rootNavigator))
