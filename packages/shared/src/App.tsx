import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import Button from './components/Button.tsx'

const App = () => (
  <Wrapper>
    <Button text='Click me' />
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
