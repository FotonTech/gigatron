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

const Signup = () => (
  <Wrapper>
    <Link routeName='Login'>
      <Button text='Login' />
    </Link>
  </Wrapper>
)

export default Signup
