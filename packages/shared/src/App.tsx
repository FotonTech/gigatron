import React from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './config/apollo'
import Router from './Router'

console.disableYellowBox = true

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  )
}

export default App
