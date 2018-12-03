import { Animated } from 'react-native';
import styled from 'styled-components';


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

const animateShimmer = () => {
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


