// @flow
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { SafeArea } from '../utils';
import { images } from '../assets/index';
import { withNavigation } from 'react-navigation';

const LeftArrow = styled.Image.attrs({
  source: images.backArrow,
})`
  width: 25;
  height: 25;
`;

const CorrectSign = styled.Image.attrs({
  source: images.correctSign,
})`
  width: 25;
  height: 25;
`;

const Wrapper = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  margin-left: 16px;
`;

const HeaderSmallText = styled.Text`
  color: #c0c0c0;
  font-size: 16;
  
  font-weight: 500;
`;

const HeaderLargeText = styled.Text`
  color: black;
  font-size: 24;
  font-weight: 500;
  
`;

const RightAvatar = styled.TouchableOpacity`
  width: 50;
  height: 50;
  border-radius: ${50 / 2};
  background-color: #404040;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
const LeftAvatar = styled.TouchableOpacity`
  width: 50;
  height: 50;
  align-items: center;
  justify-content: center;
`;

const Initials = styled.Text`
  
  color: white;
  font-size: 20;
  font-weight: 500;
`;

type Props = {
  description: string,
  title: string,
  userInitials: string,
  onPress?: () => void,
};

const Header = ({ title, description, userInitials, onPress, ...rest }: Props) => (
  <View style={{ width: `100%` }}>
    <SafeArea />
    <Wrapper>
      <LeftAvatar onPress={() => rest.navigation.goBack()}>
        <LeftArrow />
      </LeftAvatar>
      <TextWrapper>
        <HeaderSmallText>{description}</HeaderSmallText>
        <HeaderLargeText>{title}</HeaderLargeText>
      </TextWrapper>
      <RightAvatar onPress={onPress}>
        <CorrectSign />
      </RightAvatar>
    </Wrapper>
  </View>
);

export default withNavigation(Header);
