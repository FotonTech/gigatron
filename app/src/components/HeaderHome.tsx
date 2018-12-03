
import * as React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { SafeArea } from '../utils';

const Wrapper = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
`;

const TextWrapper = styled.View`
  flex-direction: column;
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

const Avatar = styled.TouchableOpacity`
  width: 50;
  height: 50;
  border-radius: ${50 / 2};
  background-color: #404040;
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
  onClickAvatar?: () => void,
};

const HeaderHome = ({ title, description, userInitials, onClickAvatar }: Props) => (
  <View>
    <SafeArea />
    <Wrapper>
      <TextWrapper>
        <HeaderSmallText>{description}</HeaderSmallText>
        <HeaderLargeText>{title}</HeaderLargeText>
      </TextWrapper>
      <Avatar onPress={onClickAvatar}>
        <Initials>{userInitials}</Initials>
      </Avatar>
    </Wrapper>
  </View>
);

export default HeaderHome;
