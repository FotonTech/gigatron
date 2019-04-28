import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import styled from 'styled-components'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Link from '../utils/crossPlatform/Link'
import { _100vh } from '../utils/crossPlatform/constants'

const Wrapper = styled(View)`
  flex: 1;
  height: ${_100vh};
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
  const handleSubmit = async values => {
    const { email, password } = values
    const { mutate } = props
    try {
      const response = await mutate({ variables: { input: { email, password } } })
    } catch (e) {
      console.log('e', e.message)
    }
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <Image source={require('../../assets/logoImg.png')} style={{ width: 150, height: 150 }} />
      </ImageWrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
          <FormikWrapper>
            <TextInput
              placeholder='email'
              onChangeText={handleChange('email')}
              value={values.email}
              error={errors.email}
            />
            <TextInput
              placeholder='password'
              onChangeText={handleChange('password')}
              value={values.password}
              error={errors.password}
            />
            <SignupWrapper>
              <Link routeName='Signup'>
                <Text>Need an account? Signup</Text>
              </Link>
            </SignupWrapper>
            <ButtonsWrapper>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Button text='Login' isSubmitting={isSubmitting} />
              </TouchableOpacity>
            </ButtonsWrapper>
          </FormikWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const LOGIN_MUTATION = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`

export default graphql(LOGIN_MUTATION)(Login)
