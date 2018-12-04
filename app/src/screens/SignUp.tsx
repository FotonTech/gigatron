import React, { useState } from 'react';
import { Alert, AsyncStorage, Platform, SafeAreaView } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation'
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
import { RouteNames } from '../config/Router';
import gql from 'graphql-tag';
import { Formik } from 'formik'
import * as yup from 'yup'

const REGISTER_MUTATION = gql`
  mutation RegisterEmailMutation($input: RegisterEmailInput!) {
    RegisterEmail(input: $input) {
      error
      token
    }
  }
`;
const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryBackground};
  padding: 0 20px 0 20px;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const TextsWrapper = styled.View`
  margin-bottom: 20;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Signup = (props: NavigationInjectedProps) => {
  const [state, setState] = useState({
    isLoading: false,
  })
  const register = useMutation(REGISTER_MUTATION);

  interface valuesType {
    email: string
    password: string
    name: string
  }
  const onSubmit = async (values: valuesType) => {
    const { name, email, password } = values;

    if (!name || !email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    setState({
      ...state,
      isLoading: true,
    });

    const input = {
      name,
      email,
      password,
    };

    interface ResponseInterface {
      RegisterEmail: {
        token: string
        error: string
      }
    }
    const onCompleted = async (res: ResponseInterface) => {
      const response = res && res.RegisterEmail;
      const token = response && response.token;
      if (response && response.error) {
        setState({
          ...state,
          isLoading: false,
        });
        return Alert.alert('Erro', 'Email already registered');
      } else if (token) {
        setState({
          ...state,
          isLoading: false,
        });
        await AsyncStorage.setItem('token', token);
        Alert.alert('Sucesso', 'Success!');
        props.navigation.navigate(RouteNames.Home);
      }
    };

    const onError = () => {
      setState({
        ...state,
        isLoading: true,
      });
      return Alert.alert('Erro', 'Verifique sua conexão com a internet');
    };

    register({ variables: { input: { name, email, password } } })
      .then(({ data }) => {
        onCompleted(data);
      })
      .catch(error => {
        onError();
      });
  };

    return (
      <Wrapper>
        <SafeAreaView />
          <Container>
              <Formik
                initialValues={{ name: '', email: 'guilhermejabur@outlook.com', password: 'passw' }}
                onSubmit={values => onSubmit({ ...values })}
                validationSchema={yup.object().shape({
                  name: yup
                    .string()
                    .required('Name is required'),
                  email: yup
                    .string()
                    .email('Invalid email')
                    .required('Email is required'),
                  password: yup
                    .string()
                    .min(6, 'Password must be at least 6 length')
                    .required('Password is required'),
                })}
              >
                {({values, handleChange, handleSubmit, errors, isValid}: FormikProps) => (
                  <React.Fragment>
                    <TitleWrapper>
                      <TextsWrapper>
                        <Text size="huge" tint="primary">⚡</Text>
                        <Text size="big" tint="primary" strong>Crie sua conta</Text>
                      </TextsWrapper>
                      <Input
                        label="Name"
                        onChange={handleChange('name')}
                        value={values.name}
                        errorMessage={errors.name}
                      />
                      <Input
                        label="Email"
                        onChange={handleChange('email')}
                        value={values.email}
                        errorMessage={errors.email}
                      />
                      <Input
                        label="Password"
                        onChange={handleChange('password')}
                        value={values.password}
                        errorMessage={errors.password}
                        isSecure
                      />
                    </TitleWrapper>
                    <ButtonsWrapper>
                      <Button disabled={state.isLoading} text="Cadastrar" onPress={handleSubmit} isLoading={state.isLoading} disabled={!isValid} />
                    </ButtonsWrapper>
                  </React.Fragment>
                )}
              </Formik>
          </Container>
      </Wrapper>
    );
}

export default Signup;