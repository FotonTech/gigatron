import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
 height: 44px;
 border-radius: 8px;
 border: 1px solid rgba(174, 174, 174, 0.5);
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin: 8px 16px;
`

const Text = styled.Text`
  color: black;
  font-size: 15px;
  margin-left: 16px;
`;


const Icon = styled.Image`
  width: 25;
  height: 25;
  margin-right: 16px;
`;

export default ({ onPress, text, icon }) => (
  <Wrapper onPress={onPress}>
    <Text>{text}</Text>
    <Icon source={icon}/>
  </Wrapper>
)