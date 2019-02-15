import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./routes/Private";
import PublicRoute from "./routes/Public";

import Users from "./screens/Users";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

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
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/users" component={Users} />
                        <PublicRoute exact path="/signup" component={SignUp} />
                        <PublicRoute exact path="/signin" component={SignIn} />
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        </Wrapper>
        <GlobalStyle />
    </Fragment>
);

export default App;
