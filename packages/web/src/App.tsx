import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Users from './screens/Users'
import Signup from './screens/Signup'
import Signin from './screens/Signin'
import styled from 'styled-components';
import { InMemoryCache  } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'


const httpLink = createHttpLink({
  uri: 'https://gigatron.now.sh/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: await localStorage.getItem('token'),
    },
  }
})

const client = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


const Wrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  flex-direction: column;
  background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
`

class App extends Component {
  render() {
    return (
      <Wrapper>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path='/users' component={Users}/>
              <PublicRoute exact path='/signup' component={Signup}/>
              <PublicRoute exact path='/signin' component={Signin}/>
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </Wrapper>
    );
  }
}

//@ts-ignore
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/users',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

//@ts-ignore
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;
