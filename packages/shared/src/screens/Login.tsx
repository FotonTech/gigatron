import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Link from '../utils/Link'

const Wrapper = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  align-self: center;
  width: 100%;
  padding: 10px;
`

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const Login = () => (
  <Wrapper>
    <Image
      source={require('../../assets/logoImg.png')}
      style={{ width: 150, height: 150, marginBottom: '50%' }}
    />
    <TextInput placeholder='email' />
    <TextInput placeholder='password' />
    <ButtonsWrapper>
      <Button text='Enter the app' />
      <Link routeName='Signup'>
        <Text>Need an account? Signup</Text>
      </Link>
    </ButtonsWrapper>
  </Wrapper>
)

export default Login
