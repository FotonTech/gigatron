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
  align-items: center;
  background-color: ${props => props.theme.colors.primaryBackground};
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const TextsWrapper = styled.View`
  margin-bottom: 20;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Login = (props: NavigationInjectedProps) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoading: false,
  })
  const login = useMutation(LOGIN_MUTATION);

  const onChangeField = (targetField: string, value: string) => {
    setState({
      ...state,
      [targetField]: value,
    });
  };

  const onSubmit = async () => {
    const { email, password } = state;
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
            <TitleWrapper>
              <TextsWrapper>
                <Text size="huge" tint="primary">⚡</Text>
                <Text size="big" tint="primary" strong>Faça o login para continuar</Text>
              </TextsWrapper>
              <Input
                secureTextEntry={false}
                placeholder="Email"
                onChangeText={value => onChangeField('email', value)}
                value={state.email}
              />
              <Input
                placeholder="Password"
                onChangeText={value => onChangeField('password', value)}
                secureTextEntry={true}
                value={state.password}
              />
            </TitleWrapper>
            <ButtonsWrapper>
              <Button disabled={state.isLoading} text="Entrar" onPress={onSubmit} isLoading={state.isLoading}/>
              <Button text="Cadastrar" onPress={() => props.navigation.navigate(RouteNames.SignUp)} />
            </ButtonsWrapper>
          </Container>
      </Wrapper>
    );
}

export default (Login);
