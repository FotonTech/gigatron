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

const LOGIN_MUTATION = gql`
  mutation LoginEmailMutation($input: LoginEmailInput!) {
    LoginEmail(input: $input) {
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

const Login = (props: NavigationInjectedProps) => {
  const [state, setState] = useState({
    isLoading: false,
  })
  const login = useMutation(LOGIN_MUTATION);

  const onChangeField = (targetField: string, value: string) => {
    setState({
      ...state,
      [targetField]: value,
    });
  };

  interface valuesType {
    email: string
    password: string
  }
  const onSubmit = async (values: valuesType) => {
    const { email, password } = values;
    setState({
      ...state,
      isLoading: true,
    });

    interface ResponseInterface {
      LoginEmail: {
        token: string
        error: string
      }
    }
    const onCompleted = async (res: ResponseInterface) => {
      const response = res && res.LoginEmail;
      const token = response && response.token;
      if (response && response.error) {
        setState({
          ...state,
          isLoading: false,
        });
        return Alert.alert('Erro', 'Usuário ou senha inválidos!');
      } else if (token) {
        setState({
          ...state,
          isLoading: false,
        });
        await AsyncStorage.setItem('token', token);
        props.navigation.navigate(RouteNames.Home);
      }
    };
    const onError = () => {
      setState({
        ...state,
        isLoading: false,
      });
      return Alert.alert('Erro', 'Verifique sua conexão com a internet');
    };

    login({ variables: { input: { email, password } } })
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
                initialValues={{ email: 'guilhermejabu', password: 'passw' }}
                onSubmit={values => onSubmit({ ...values })}
                validationSchema={yup.object().shape({
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
                        <Text size="big" tint="primary" strong>Login</Text>
                      </TextsWrapper>
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
                      <Button text="Entrar" onPress={handleSubmit} isLoading={state.isLoading} disabled={!isValid || state.isLoading} />
                      <Button text="Cadastrar" onPress={() => props.navigation.navigate(RouteNames.SignUp)} />
                    </ButtonsWrapper>
                  </React.Fragment>
                )}
              </Formik>
          </Container>
      </Wrapper>
    );
}

export default (Login);