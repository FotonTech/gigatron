import React from 'react'
import Welcome from './components/Welcome'
import styled from 'styled-components/native'

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default () => (
  <Wrapper>
    <Welcome />
  </Wrapper>
)
