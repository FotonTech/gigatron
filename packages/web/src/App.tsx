import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Users from "./screens/Users";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

import client from "./graphql/client";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    min-height: 100vh;
    flex-direction: column;
    background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
`;

class App extends Component {
    render() {
        return (
            <Wrapper>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/users"
                                component={Users}
                            />
                            <PublicRoute
                                exact
                                path="/SignUp"
                                component={SignUp}
                            />
                            <PublicRoute
                                exact
                                path="/SignIn"
                                component={SignIn}
                            />
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
                !localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/users",
                            state: { from: props.location }
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
                localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;
