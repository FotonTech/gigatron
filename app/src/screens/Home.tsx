
import * as React from 'react';
import { Animated, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { withNavigationFocus } from 'react-navigation';

import HeaderHome from '../components/HeaderHome';
import { getInitials, SafeArea } from '../utils';
import { images } from '../assets';
import idx from 'idx';
import ActionButton from '../components/ActionButton';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const { width } = Dimensions.get('window');

const NoAnimalsWrapper = styled.View`
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Animal = styled.Image.attrs({
  source: images.happyDog,
})`
  width: 61;
  height: 106;
  tint-color: #e9e9e9;
  margin-bottom: 10;
`;

const NoAnimalText = styled.Text`
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
  width: ${width - 30};
  border-radius: 20;
  margin: 10px 15px;
  align-items: center;
  justify-content: center;
  background: #9858F3;
`;

const CardWrapper = styled.TouchableOpacity`
  height: 120;
  width: ${width - 30};
  border-radius: 20;
  margin: 10px 15px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${width - 90};
`;

const PetName = styled.Text`
  
  font-size: 20;
  color: white;
`;

const Infos = styled.Text`
  
  font-size: 13;
  color: white;
`;

const CardsShimmer = styled(Animated.View)`
  height: 120;
  width: ${width - 30};
  border-radius: 10;
  margin: 10px 15px;
`;
const HeaderNameShimmer = styled(Animated.View)`
  height: 50;
  width: ${width - 100};
  border-radius: 10;
`;

const HeaderRowShimmer = styled.View`
  flex-direction: row;
  padding: 15px;
  justify-content: space-between;
`;

const HeaderProfileImageShimmer = styled(Animated.View)`
  width: 50;
  height: 50;
  border-radius: ${50 / 2};
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: white;
`;

type Props = {
  isFetching?: boolean,
} & RelayRefetchProp;

type State = {
  animatedValue: Animated.Value,
  refreshing: boolean,
  isFetchingEnd: boolean,
};

class Home extends React.Component<Props, State> {
  state = {
    animatedValue: new Animated.Value(0),
    refreshing: false,
    isFetchingEnd: false,
  };

  renderFooter = () => {
    const { isFetchingEnd } = this.state;

    if (!isFetchingEnd) {
      return null;
    }

    return (
      <LoadingWrapper>
        <ActivityIndicator animating={true} color="black" />
      </LoadingWrapper>
    );
  };

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    if (isFocused && isFocused !== prevProps.isFocused) {
      this.refetch();
    }
  }

  onEndReached = () => {
    const { data } = this.props;
    data.fetchMore({
      variables: { first: data.pets.edges.length + 10 },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          pets: fetchMoreResult.pets,
        };
      },
    });
  };

  refetch = () => {
    this.props.data.refetch();
  };

  animateShimmer = () => {
    Animated.sequence([
      Animated.timing(this.state.animatedValue, {
        toValue: 150,
        duration: 500,
      }),
      Animated.timing(this.state.animatedValue, {
        toValue: 0,
        duration: 600,
      }),
    ]).start(() => {
      this.animateShimmer();
    });
  };

  renderItem = ({ item }) => {
    return (
      <CardWrapper onPress={() => this.props.navigation.navigate('Pet', { petId: item.node._id })}>
        <PetCard>
          <TextWrapper>
            <PetName>{item.node.name}</PetName>
            <Infos>{item.node.race}</Infos>
          </TextWrapper>
        </PetCard>
      </CardWrapper>
    );
  };

  render() {
    const { data } = this.props;

    console.log('data', data);

    if (data.loading) {
      const interpolateColor = this.state.animatedValue.interpolate({
        inputRange: [0, 150],
        outputRange: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)'],
      });

      const shimmerStyle = {
        backgroundColor: interpolateColor,
      };

      this.animateShimmer();

      return (
        <LoadingContainer>
          <SafeArea />
          <HeaderRowShimmer>
            <HeaderNameShimmer style={shimmerStyle} />
            <HeaderProfileImageShimmer style={shimmerStyle} />
          </HeaderRowShimmer>
          <CardsShimmer style={shimmerStyle} />
          <CardsShimmer style={shimmerStyle} />
          <CardsShimmer style={shimmerStyle} />
        </LoadingContainer>
      );
    }

    const name = idx(data.me, _ => _.name);
    const edges = idx(data.pets, _ => _.edges) || [];
    const isEmpty = edges.length === 0;

    return (
      <Wrapper>
        <HeaderHome title={`Olá ${name}`} description="Aqui estão suas conversas" userInitials={getInitials(name)} />
        {isEmpty ? (
          <NoAnimalsWrapper>
            <NoAnimalText>Inicie uma conversa para continuar</NoAnimalText>
          </NoAnimalsWrapper>
        ) : (
          <FlatList
            ListFooterComponen={this.renderFooter()}
            data={edges}
            keyExtractor={item => item.node._id}
            renderItem={this.renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this.refetch}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={1}
          />
        )}
        <ActionButton onPress={() => this.props.navigation.navigate('AddPet')} />
      </Wrapper>
    );
  }
}

const PETS_QUERY = gql`
  query pets($first: Int) {
    pets(first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          _id
          race
          image
        }
      }
    }
    me {
      name
    }
  }
`


export default graphql(PETS_QUERY)(withNavigationFocus(Home))