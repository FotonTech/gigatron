import React, { Component } from 'react';
import styled from 'styled-components';
import UserItem from '../components/UserItem';
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

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 800px;
  margin: 40px;
  border-radius: 20px;
`
interface data {
  name: string
  email: string
}

class Users extends React.Component<any> {

  state = {
    size: 10,
    page: 0,
  }

  render() {
    const { data } = this.props;
    if(data.loading) {
      return null;
    }
    return (
      <Wrapper>
        <Card>
          {data && data.users && data.users.edges.map((user: data, index: Number) =>
            <UserItem key={`UserItem_${index}`} first={index === 0} name={user.name} email={user.email} />
          )}
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
})(Users)
