// @flow
import React, { Component, useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Alert, AsyncStorage, Platform, View } from 'react-native';
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
  background-color: ${p => p.theme.colors.primaryBackground};
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
  color: ${props => props.theme.colors.primaryText};
  margin-top: ${props => props.margintop};
  margin-bottom: 10;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onChangeField = (targetField: string, value: string) => {
    this.setState({
      [targetField]: value,
    });
  };

  onSubmit = async () => {
    const { email, password } = this.state;

    const onCompleted = async res => {
      const response = res && res.LoginEmail;
      const token = response && response.token;
      if (response && response.error) {
        this.setState({
          isLoading: false,
        });
        return Alert.alert('Erro', 'Usuario ou senha invalidos!');
      } else if (token) {
        this.setState({
          isLoading: false,
        });
        await AsyncStorage.setItem('token', token);
        this.props.navigation.navigate(RouteNames.Home);
      }
    };
    const onError = () => {
      this.setState({
        isLoading: false,
      });
      return Alert.alert('Erro', 'Verifique sua conexão com a internet');
    };

    this.props
      .mutate({ variables: { input: { email, password } } })
      .then(({ data }) => {
        onCompleted(data);
      })
      .catch(error => {
        onError();
      });
  };

  render() {
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
                onChangeText={value => this.onChangeField('email', value)}
                value={this.state.email}
              />
              <Input
                placeholder="Password"
                onChangeText={value => this.onChangeField('password', value)}
                secureTextEntry={true}
                value={this.state.password}
              />
            </TitleWrapper>
            <ButtonsWrapper>
              <TouchableOpacity>
                <Link margintop={30}>Esqueci minha senha</Link>
              </TouchableOpacity>
              <Button disabled={this.state.isLoading} text="Entrar" onPress={this.onSubmit} />
              <Link margintop={10}>Ainda não e cadastrado</Link>
              <Button text="Cadastrar" onPress={() => this.props.navigation.navigate(RouteNames.SignUp)} />
            </ButtonsWrapper>
          </Container>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </Wrapper>
    );
  }
}

export default graphql(LOGIN_MUTATION)(Login);
