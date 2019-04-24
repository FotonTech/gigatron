import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Button from '../components/Button'
import Link from '../utils/Link'

const Wrapper = styled(View)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`

const Login = () => (
  <Wrapper>
    <Link routeName='Signup'>
      <Button text='Signup' />
    </Link>
  </Wrapper>
)

export default Login
