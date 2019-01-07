
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Text from './Text'

const Wrapper = styled.TouchableOpacity`
  padding: 15px 65px;
  background-color: ${props => (props.disabled ? 'grey' : '#ffffff')};
  border-radius: 25;
  align-items: center;
  justify-content: center;
  margin-top: 20;
`;


interface Props {
  text: string
  onPress: () => any
  disabled?: boolean
  isLoading?: boolean
};

const Button = ({ text, onPress, disabled, isLoading }: Props) => (
  <Wrapper disabled={disabled || isLoading} onPress={onPress}>
    {isLoading ? (<ActivityIndicator />) : (<Text size="small" tint="secondary" strong>{text}</Text>)}
  </Wrapper>
);

export default Button;
