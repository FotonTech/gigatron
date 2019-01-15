import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const users = gql`
  query users($size: Int!, $page: Int!) {
    users(size: $size, page: $page) {
      edges {
        name
        email
      }
      hasNextPage
    }
  }
`

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
`

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 800px;
  margin: 40px;
  border-radius: 20px;
`

const Title = styled.p`
  margin: 0;
  font-size: 65px;
  font-weight: 900;
  color: white;
  margin-top: 50px;
`

class Signup extends React.Component<any> {
  state = {
    name: '',
    email: '',
    password: '',
  }
  render() {
    return (
      <Wrapper>
        <Card>
          <Title>Sign up</Title>
          <FormWrapper>
            <Input placeholder="Name" onChange={(e: any) => this.setState({ name: e.target.value })} />
            <Input placeholder="Email" onChange={(e: any) => this.setState({ email: e.target.value })} />
            <Input placeholder="password" onChange={(e: any) => this.setState({ password: e.target.value })} />
          </FormWrapper>
          <Button text="Signup"/>
        </Card>
      </Wrapper>
    )
  }
}

// @ts-ignore
export default graphql(users,  {
  options: (props) => ({
    variables: {
      size: 10,
      page: 0,
    },
  }),
})(Signup)
