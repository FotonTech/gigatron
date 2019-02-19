import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";

import Login from "./components/Login/Login";
import Users from "./screens/Users";
import UsersTest from "./components/Users/Users";

import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";

import client from "./graphql/client";
import reset from "./styles/constants/reset";

const GlobalStyle = createGlobalStyle`${reset}`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
`;

const App = () => (
    <Fragment>
        <Wrapper>
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    <BrowserRouter>
                        <Switch>
                            <PublicRoute exact path="/" component={Login} />
                            <PublicRoute
                                exact
                                path="/signin"
                                component={Login}
                            />
                            <PublicRoute
                                exact
                                path="/signup"
                                component={Login}
                            />
                            <PublicRoute
                                exact
                                path="/forgot"
                                component={Login}
                            />
                            <PrivateRoute
                                exact
                                path="/users"
                                component={Users}
                            />
                            <PrivateRoute
                                exact
                                path="/test"
                                component={UsersTest}
                            />
                        </Switch>
                    </BrowserRouter>
                </ApolloHooksProvider>
            </ApolloProvider>
        </Wrapper>
        <GlobalStyle />
    </Fragment>
);

export default App;
