
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Button = ({ onPress, disabled }: Props) => (
  <Wrapper>
    <ActivityIndicator  size="large" color="#7F00FF" />
  </Wrapper>
);

export default Button;
