import React, { createContext, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './config/apollo'
import Router from './Router'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  )
}

export default App
