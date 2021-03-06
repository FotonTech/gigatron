import React from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import styled from 'styled-components'
import { Formik, FormikActions } from 'formik'
import * as Yup from 'yup'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Link from '../utils/Link'
import { vh, grey85 } from '../utils/styling'

const initialValues = { name: '', email: '', password: '' }
type InitialValues = typeof initialValues

const Signup = props => {
  const handleSubmit = async (values: InitialValues, actions: FormikActions<InitialValues>) => {
    const { name, email, password } = values
    const { mutate } = props
    try {
      const response = await mutate({ variables: { input: { name, email, password } } })
      // console.log('Signup response', response)
      const { token } = response.data.addUser
      if (!token) {
        throw response
      }
      await AsyncStorage.setItem('token', token)
    } catch (e) {
      console.log('signup error', e)
      if (/User already exists/.test(e.message)) {
        Alert.alert('User already exists')
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
          <FormikWrapper>
            <TextInput
              placeholder='name'
              placeholderTextColor={grey85}
              onChangeText={handleChange('name')}
              value={values.name}
              error={errors.name}
            />
            <TextInput
              placeholder='email'
              placeholderTextColor={grey85}
              onChangeText={handleChange('email')}
              value={values.email}
              error={errors.email}
              autoCapitalize='none'
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
              <Link routeName='Login'>
                <Text>Back to login</Text>
              </Link>
            </SignupWrapper>
            <ButtonsWrapper>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Button text='Signup' isSubmitting={isSubmitting} />
              </TouchableOpacity>
            </ButtonsWrapper>
          </FormikWrapper>
        )}
      </Formik>
    </Wrapper>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const SIGNUP_MUTATION = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
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

export default graphql(SIGNUP_MUTATION)(Signup)
