// @flow
import * as React from 'react';
import { ScrollView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { withNavigationFocus } from 'react-navigation';

import { SafeArea } from '../utils';
import idx from 'idx';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { images } from '../assets/index';
import PetItem from '../components/PetItem';

const { width } = Dimensions.get('window');

const LoadingWrapper = styled.View`
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;


const PetHeader = styled.ImageBackground`
  height: 210px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: red;
  padding: 20px;
`;

const TextWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;

const ArrowWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const PetName = styled.Text`
  
  font-size: 24;
  color: white;
`;

const LeftAvatar = styled.TouchableOpacity`
  width: 40;
  height: 40;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20;
`;


const LeftArrow = styled.Image.attrs({
  source: images.backArrow,
})`
  width: 15;
  height: 15;
`;

const PetDescription = styled.Text`
  
  font-size: 18;
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
  query?: Home_query,
} & RelayRefetchProp;

type State = {
  animatedValue: Animated.Value,
  refreshing: boolean,
  isFetchingEnd: boolean,
};

class Pet extends React.Component<Props, State> {
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

    const { pet } = data;
    return (
      <Wrapper>
        <ScrollView>
        <PetHeader>
          <ArrowWrapper>
            <LeftAvatar onPress={() => this.props.navigation.goBack()}>
              <LeftArrow />
            </LeftAvatar>
          </ArrowWrapper>
          <TextWrapper>
            <PetName>{pet.name}</PetName>
            <PetDescription>{pet.race}</PetDescription>
            <PetDescription>{pet.gender}</PetDescription>
          </TextWrapper>
        </PetHeader>
        <PetItem text="Carteira de vacinação" icon={images.Seringa} />
        <PetItem text="Carteira de vermifugos" icon={images.Minhoca} />
        <PetItem text="Agenda de banhos" icon={images.Banho} />
        <PetItem text="Agenda de medicamentos" icon={images.Remedio} />
        <PetItem text="Agenda de consultas" icon={images.Estetoscopio} />
        <PetItem text="Agenda de tratamentos" icon={images.Bisturi} />
        <PetItem text="Grafico de Peso" icon={images.Minhoca} />
        </ScrollView>
      </Wrapper>
    );
  }
}

const QUERY = gql`
  query pet($petId: String!) {
    pet(petId: $petId) {
      id
      name
      race
      gender
      image
    }
  }
`


export default graphql(QUERY, {
  options: ({ navigation }) => ({ variables: { petId: navigation.state.params.petId } }),
})(withNavigationFocus(Pet))