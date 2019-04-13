import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Button from './components/Button'

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

export default App
