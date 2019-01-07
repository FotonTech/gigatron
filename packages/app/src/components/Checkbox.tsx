
import React from 'react';
import { Dimensions, Switch } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Wrapper = styled.View`
  margin-top: 20;
  padding: 10px;
  border-bottom-color: black;
  border-bottom-width: 2;
  width: ${width - 40};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 16;
  font-weight: 600;
  
`;

type Props = {
  placeholder: string,
  value: string,
  secureTextEntry: boolean,
  onChangeText: (value: string) => void,
};

const Checkbox = ({ placeholder, value, onValueChange }: Props) => (
  <Wrapper>
    <Text>{placeholder}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </Wrapper>
);

export default Checkbox;
