import React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Input from "../components/Input";
import Button from "../components/Button";

const addUser = gql`
    mutation addUser($input: AddUserInput!) {
        addUser(input: $input) {
            token
            error
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 800px;
    margin: 40px;
    border-radius: 20px;
`;

const Title = styled.p`
    margin: 0;
    font-size: 65px;
    font-weight: 900;
    color: white;
    margin-top: 50px;
`;

class SignUp extends React.Component<any> {
    state = {
        name: "",
        email: "",
        password: ""
    };

    handleSignUp = () => {
        const { name, email, password } = this.state;
        const { mutate, history } = this.props;

        mutate({
            variables: {
                input: {
                    name,
                    email,
                    password
                }
            }
        })
            .then(async ({ data }: any) => {
                const { addUser } = data;
                if (addUser.token) {
                    await localStorage.setItem("token", addUser.token);
                    return history.push("/users");
                }
            })
            .catch((error: string) => {
                console.log("error", error);
            });
    };

    render() {
        return (
            <Wrapper>
                <Card>
                    <Title>Sign up</Title>
                    <FormWrapper>
                        <Input
                            placeholder="Name"
                            onChange={(e: any) =>
                                this.setState({ name: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Email"
                            onChange={(e: any) =>
                                this.setState({ email: e.target.value })
                            }
                        />
                        <Input
                            placeholder="password"
                            onChange={(e: any) =>
                                this.setState({ password: e.target.value })
                            }
                        />
                    </FormWrapper>
                    <Button text="SignUp" onClick={this.handleSignUp} />
                    <Button
                        text="Signin?"
                        onClick={() => this.props.history.push("/signin")}
                    />
                </Card>
            </Wrapper>
        );
    }
}

// @ts-ignore
export default graphql(addUser)(SignUp);
