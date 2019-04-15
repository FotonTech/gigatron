import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Button from './components/Button'

const App = () => (
  <Wrapper>
    <Button text='Login' />
    <Button text='Signup' />
  </Wrapper>
)

const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`

export default App
