import React, { Component, useState } from 'react';
import { TouchableOpacity, ScrollView, Alert, AsyncStorage, Platform, View } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { NavigationScreenProps } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styled from 'styled-components';
import { images } from '../assets';
import Input from '../components/Input';
import Button from '../components/Button';
import { RouteNames } from '../config/Router';
import { SafeArea } from '../utils';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
  background-color: ${(props: any) => props.theme.colors.primaryBackground};
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  padding-bottom: 20;
  justify-content: center;

`;

const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const WelcomeText = styled.Text`
  font-size: 53;
  font-weight: 500;
  color: black;
  margin-top: 30;
`;

const IndicationText = styled.Text`
  font-size: 18;
  color: white;
  margin-bottom: 10;
  font-weight: 500;
`;


const Link = styled.Text`
  font-size: 16;
  font-weight: 300;
  color: ${(props: any) => props.theme.colors.primaryText};
  margin-top: ${(props: any) => props.margintop};
  margin-bottom: 10;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface Props {
  email: string
  password: string
  isLoading: string
  navigation: NavigationScreenProps
}

const Login = (props: Props) => {
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

    const onCompleted = async res => {
      const response = res && res.LoginEmail;
      const token = response && response.token;
      if (response && response.error) {
        setState({
          ...state,
          isLoading: false,
        });
        return Alert.alert('Erro', 'Usuario ou senha invalidos!');
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
        <SafeArea />
          <Container>
            <TitleWrapper>
              <WelcomeText>⚡</WelcomeText>
              <IndicationText>Faça o login para continuar</IndicationText>
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
              <TouchableOpacity>
                <Link margintop={30}>Esqueci minha senha</Link>
              </TouchableOpacity>
              <Button disabled={state.isLoading} text="Entrar" onPress={onSubmit} />
              <Link margintop={10}>Ainda não e cadastrado</Link>
              <Button text="Cadastrar" onPress={() => props.navigation.navigate(RouteNames.SignUp)} />
            </ButtonsWrapper>
          </Container>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </Wrapper>
    );
}

export default (Login);
