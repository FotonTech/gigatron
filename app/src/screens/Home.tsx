
import * as React from 'react';
import { Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { useMutation } from 'react-apollo-hooks';

import idx from 'idx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from '../components/Loading'
import { RouteNames } from '../config/Router';

type Props = {
  isFetching?: boolean,
};

type State = {
  refreshing: boolean,
  isFetchingEnd: boolean,
};

const Home = (props: Props) => {
  const [state, setState] = React.useState({
    refreshing: false,
    isFetchingEnd: false,
    email: '',
  })

  const startConversation = useMutation(START_CONVERSATION_MUTATION);
  console.log('conversations', props)

  const renderFooter = () => {
    const { isFetchingEnd } = state;

    if (!isFetchingEnd) {
      return null;
    }

    return (
      <LoadingWrapper>
        <ActivityIndicator animating={true} color="black" />
      </LoadingWrapper>
    );
  };

  const onEndReached = () => {
    const { data } = props;
    data.fetchMore({
      variables: { first: idx(data, _ => _.conversations.edges.length) + 10 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          pets: fetchMoreResult.pets,
        };
      },
    });
  };

  const refetch = () => {
    props.data.refetch();
  };

  const renderItem = ({ item }) => {
    const { navigation } = props;
    return (
      <CardWrapper onPress={() => navigation.navigate(RouteNames.Chat, {conversationId: item.node._id})}>
        <UserName>{item.node.otherUser.name}</UserName>
      </CardWrapper>
    );
  };

  const handleStartConversationPress = (email) => {
    /*
    setState({
      ...state,
      isLoading: true,
    });
    */

    interface ResponseInterface {
      LoginEmail: {
        token: string
        error: string
      }
    }
    const onCompleted = async (res: ResponseInterface) => {
      const response = res && res.LoginEmail;
      const token = response && response.token;
      if (response && response.error) {
        /*
        setState({
          ...state,
          isLoading: false,
        });
        */
      } else if (token) {
        /*
        setState({
          ...state,
          isLoading: false,
        });
        */
        // props.navigation.navigate(RouteNames.Home);
      }
    };
    const onError = () => {
        /*
      setState({
        ...state,
        isLoading: false,
      });
      */
    };

    startConversation({ variables: { input: { email } } })
      .then(({ data }) => {
        onCompleted(data);
      })
      .catch(error => {
        onError();
      });
  }

    const { data } = props;
    const { email } = state;

    const edges = idx(data, _ => _.conversations.edges) || [];
    const isEmpty = edges.length === 0;

    return (
      <Wrapper>
        <SafeAreaView />
        <SearchWrapper>
          <SearchInput value={email} onChangeText={(email: string) => setState({ email })} />
          <StartConversationButton onPress={() => handleStartConversationPress(email)}>
            <Text style={{}}>Go</Text>
          </StartConversationButton>
        </SearchWrapper>
        {data.loading ? <Loading /> : (
          isEmpty ? (
            <EmptyWrapper>
              <EmptyText>Inicie uma conversa para continuar</EmptyText>
            </EmptyWrapper>
          ) : (
            <FlatList
              ListFooterComponen={renderFooter}
              data={edges}
              keyExtractor={item => item.node._id}
              renderItem={renderItem}
              refreshing={state.refreshing}
              onRefresh={refetch}
              onEndReached={onEndReached}
              onEndReachedThreshold={1}
            />
          )
        )}

        {}
      </Wrapper>
    );
}


const EmptyWrapper = styled.View`
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.View`
  height: 30px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.TextInput.attrs({
  autoCapitalize: 'none',
})`
  border: 1px solid black;
  height: 30px;
  border-radius: 10;
  flex: 5;
  padding-left: 5px;
`

const StartConversationButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 40;
`;

const EmptyText = styled.Text`
  font-size: 16;
  color: #e9e9e9;
`;

const LoadingWrapper = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const PetCard = styled.ImageBackground.attrs({
  source: {uri: 'http://en.wikipedia.org/wiki/Lake#/media/File:Lac_Peyto_(4).jpg'}
})`
  height: 120;
  width: 100%;
  border-radius: 20;
  align-items: center;
  justify-content: center;
  background: #9858F3;
`;

const CardWrapper = styled.TouchableOpacity`
  height: 55;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const UserName = styled.Text`
  font-size: 20;
  color: black;
`;

const Infos = styled.Text`
  font-size: 13;
  color: white;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  padding-left: 10;
  padding-right: 10;
`;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const CONVERSATIONS_QUERY = gql`
  query conversations($first: Int = 10) {
    conversations(first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _id
          otherUser {
            _id
            name
          }
          lastMessage
          updatedAt
        }
      }
    }
    me {
      name
    }
  }
`

const START_CONVERSATION_MUTATION = gql`
  mutation StartConversationMutation($input: StartConversationInput!) {
    StartConversation(input: $input) {
      error
      status
      message
      conversation {
        id
        otherUser {
          id
          name
        }
      }
    }
  }
`;

export default graphql(CONVERSATIONS_QUERY)(Home)