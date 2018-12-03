
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const { width } = Dimensions.get('window');

const Wrapper = styled.TextInput`
  margin-top: 20;
  padding: 10px;
  border-bottom-color: white;
  color: white;
  border-bottom-width: 2;
  width: ${width - 40};
  font-size: 16;
  font-weight: 600;
`;

type Props = {
  placeholder: string,
  value: string,
  secureTextEntry: boolean,
  onChangeText: (value: string) => void,
};

const Input = ({ placeholder, value, secureTextEntry, onChangeText }: Props) => (
  <Wrapper
    placeholder={placeholder}
    placeholderTextColor="white"
    value={value}
    secureTextEntry={secureTextEntry}
    onChangeText={value => onChangeText(value)}
    underlineColorAndroid="rgba(0,0,0,0)"
    autoCapitalize="none"
  />
);

export default Input;
