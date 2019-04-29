import React from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styled from 'styled-components'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Link from '../utils/Link'
import { vh } from '../utils/styling'
import { grey85 } from '../utils/styling'

const initialValues = { email: '', password: '' }
type InitialValues = typeof initialValues

const Login = props => {
  const handleSubmit = async (values: InitialValues, actions: FormikActions<InitialValues>) => {
    const { email, password } = values
    const { mutate } = props
    try {
      const response = await mutate({ variables: { input: { email, password } } })
      // console.log('Login response', response)
      const { token } = response.data.loginUser
      if (!token) {
        throw response
      }
      await AsyncStorage.setItem('token', token)
    } catch (e) {
      console.log('login error', e.message)
      if (e.message) {
        Alert.alert(e.message.replace(/\w+ error: /, ''))
      }
    } finally {
      actions.setSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <Image source={require('../../assets/logoImg.png')} style={{ width: 150, height: 150 }} />
      </ImageWrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
          <FormikWrapper>
            <TextInput
              placeholder='email'
              placeholderTextColor={grey85}
              onChangeText={handleChange('email')}
              autoCapitalize='none'
              value={values.email}
              error={errors.email}
            />
            <TextInput
              placeholder='password'
              placeholderTextColor={grey85}
              onChangeText={handleChange('password')}
              secureTextEntry
              autoCapitalize='none'
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
const Wrapper = styled(View)`
  flex: 1;
  height: ${vh(100)};
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

export default graphql(LOGIN_MUTATION)(Login)
