import React, { createContext, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './config/apollo'
import Router from './Router'

export const ModalContext = createContext(null)

const App = () => {
  // const [modal, setModal] = useState(false)

  return (
    <ModalContext.Provider>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </ModalContext.Provider>
  )
}

export default App
