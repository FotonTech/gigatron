// @flow
import React from 'react';
import { Platform } from 'react-native';
import styled, { css, StyledComponentClass } from 'styled-components';

const Wrapper = styled.TouchableOpacity`
  height: 65px;
  width: 65px;
  background-color: ${props => (props.disabled ? 'grey' : '#404040')};
  border-radius: 35;
  align-items: center;
  justify-content: center;
  ${Platform.select({
    ios: css`
      shadow-color: grey;
      shadow-offset: 0px 2px;
      shadow-radius: 2px;
      shadow-opacity: 2px;
    `,
    android: css`
      elevation: 5;
    `,
  })};
  position: absolute;
  bottom: 25px;
  right: 25px;
`;

const Text = styled.Text`
  color: white;
  
  font-size: 25px;
`;

type Props = {
  text: string,
  onPress: () => any,
  disabled?: boolean,
};

const Button = ({ onPress, disabled }: Props) => (
  <Wrapper disabled={disabled} onPress={onPress}>
    <Text>+</Text>
  </Wrapper>
);

export default Button;
