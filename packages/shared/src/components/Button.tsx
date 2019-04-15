import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const Button = props => (
  <Wrapper>
    <WelcomeText>{props.text}</WelcomeText>
  </Wrapper>
)

const Wrapper = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ff0000;
  width: 200px;
  height: 60px;
  border-radius: 5px;
`

const WelcomeText = styled(Text)`
  color: #ffffff;
  font-size: 23px;
`

export default Button
