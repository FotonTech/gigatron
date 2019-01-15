import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Users from './screens/Users'
import Signup from './screens/Signup'
import Signin from './screens/Signin'
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
