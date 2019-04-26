import React from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import styled from 'styled-components'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Link from '../utils/Link'
import { Formik } from 'formik'

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

const FormikWrapper = styled(View)`
  flex: 3;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: center;
`

const ImageWrapper = styled(View)`
  flex: 2;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: center;
`

const SignupWrapper = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`

const Login = props => {
  const handleSubmit = values => {}

  return (
    <Wrapper>
      <ImageWrapper>
        <Image source={require('../../assets/giga.gif')} style={{ width: 150, height: 150 }} />
      </ImageWrapper>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={values => handleSubmit(values)}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <FormikWrapper>
            <TextInput
              placeholder='email'
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              placeholder='password'
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <SignupWrapper>
              <Link routeName='Signup'>
                <Text>Need an account? Signup</Text>
              </Link>
            </SignupWrapper>
            <ButtonsWrapper>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Button text='Login' />
              </TouchableOpacity>
            </ButtonsWrapper>
          </FormikWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Login
