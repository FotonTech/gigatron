import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './screens/Users'
import Signup from './screens/Signup'
import styled from 'styled-components';
import ApolloClient, { InMemoryCache  } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache()
})

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/users' component={Users}/>
              <Route exact path='/signup' component={Signup}/>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </Wrapper>
    );
  }
}

export default App;
