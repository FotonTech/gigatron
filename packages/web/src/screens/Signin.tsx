import React from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const loginUser = gql`
    mutation loginUser($input: LoginUserInput!) {
        loginUser(input: $input) {
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

class Signup extends React.Component<any> {
    state = {
        email: "",
        password: ""
    };

    handleSignUp = () => {
        const { email, password } = this.state;
        const { mutate, history } = this.props;

        mutate({
            variables: {
                input: {
                    email,
                    password
                }
            }
        })
            .then(async ({ data }: any) => {
                const { loginUser } = data;
                if (loginUser.token) {
                    await localStorage.setItem("token", loginUser.token);
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
                    <Title>Sign in</Title>
                    <FormWrapper>
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
                    <Button text="Signin" onClick={this.handleSignUp} />
                    <Button
                        text="Signup?"
                        onClick={() => this.props.history.push("/signup")}
                    />
                </Card>
            </Wrapper>
        );
    }
}

// @ts-ignore
export default graphql(loginUser)(Signup);
