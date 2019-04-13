import React from 'react'
import Button from './components/Button'
import styled from 'styled-components'

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default () => (
  <Wrapper>
    <Button text='bleeding fking edge' />
  </Wrapper>
)
