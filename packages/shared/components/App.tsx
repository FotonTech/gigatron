import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const App = () => (
  <Wrapper>
    <WelcomeText> Welcome to gigatron </WelcomeText>
  </Wrapper>
)

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const WelcomeText = styled(Text)`
  color: #a300fb;
  font-size: 23;
  margin: 40px;
`

export default App
