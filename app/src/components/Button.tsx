
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  padding: 15px 30px;
  background-color: ${props => (props.disabled ? 'grey' : '#ffffff')};
  border-radius: 25;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: ${p => p.theme.colors.primaryBackground};
  font-weight: bold;
`;

type Props = {
  text: string,
  onPress: () => any,
  disabled?: boolean,
};

const Button = ({ text, onPress, disabled }: Props) => (
  <Wrapper disabled={disabled} onPress={onPress}>
    <Text>{text}</Text>
  </Wrapper>
);

export default Button;
