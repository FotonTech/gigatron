import * as React from 'react';
import { Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from 'react-apollo-hooks';

import idx from 'idx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from '../components/Loading'
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = (props) => {

  
  const onSend = () => {

  }
  return (
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
  )
}


const MESSAGES_QUERY = gql`
  query messages($first: Int = 10, $conversation: ID) {
    messages(first: $first, conversation: $conversation) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          owner {
            id
            name
          }
          text
          createdAt
        }
      }
    }
    me {
      id
      name
    }
  }
`

const ADD_MESSAGE = gql`
  mutation AddMessageMutation($input: AddMessageInput!) {
    AddMessage(input: $input) {
      error
      status
      text
      owner
    }
  }
`;

export default graphql(MESSAGES_QUERY)(Chat)