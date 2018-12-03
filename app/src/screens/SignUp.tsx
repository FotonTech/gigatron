
import React, { Component } from 'react';
import { ScrollView, Alert, AsyncStorage, Platform } from 'react-native';
import styled from 'styled-components/native';
import { images } from '../assets';
import Input from '../components/Input';
import Button from '../components/Button';
import { SafeArea } from '../utils';
import { RouteNames } from '../config/Router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
  align-items: center;
  background-color: ${p => p.theme.colors.primaryBackground};
`;

const WelcomeText = styled.Text`
  font-size: 53;
  font-weight: 500;
  color: ${p => p.theme.colors.primaryText};
  margin-top: 30;
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

const Link = styled.Text`
  font-size: 16;
  font-weight: 300;
  color: black;
  margin-top: ${props => props.margintop};
  margin-bottom: 10;
`;

const IndicationText = styled.Text`
  font-size: 18;
  color: ${p => p.theme.colors.primaryText};
  margin-bottom: 10;
  font-weight: 500;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

type State = {
  email: string,
  password: string,
  name: string,
  isLoading: boolean,
};

class SignUp extends Component<void, State> {
  state = {
    email: '',
    password: '',
    name: '',
    isLoading: false,
  };

  onSubmit = async () => {
    const { name, email, password } = this.state;

    if (!name || !email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    this.setState({
      isLoading: true,
    });

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = async res => {
      const response = res && res.RegisterEmail;
      const token = response && response.token;
      if (response && response.error) {
        this.setState({
          isLoading: false,
        });
        return Alert.alert('Erro', 'Email já cadastrado na plataforma');
      } else if (token) {
        this.setState({
          isLoading: false,
        });
        await AsyncStorage.setItem('token', token);
        Alert.alert('Sucesso', 'Cadastrado com sucesso!');
        this.props.navigation.navigate(RouteNames.Home);
      }
    };

    const onError = () => {
      this.setState({
        isLoading: true,
      });
      return Alert.alert('Erro', 'Verifique sua conexão com a internet');
    };

    this.props
      .mutate({ variables: { input: { name, email, password } } })
      .then(({ data }) => {
        onCompleted(data);
      })
      .catch(error => {
        onError();
      });
  };

  onChangeField = (targetField: string, value: string) => {
    this.setState({
      [targetField]: value,
    });
  };
  render() {
    return (
      <Wrapper>
        <SafeArea />
          <Container>
            <TitleWrapper>
              <WelcomeText>⚡</WelcomeText>
              <IndicationText>Preencha os campos para continuar</IndicationText>
              <Input
                secureTextEntry={false}
                placeholder="Email"
                onChangeText={value => this.onChangeField('email', value)}
                value={this.state.email}
              />
              <Input
                secureTextEntry={false}
                placeholder="Nome Completo"
                onChangeText={value => this.onChangeField('name', value)}
                value={this.state.name}
              />
              <Input
                placeholder="Password"
                onChangeText={value => this.onChangeField('password', value)}
                secureTextEntry={true}
                value={this.state.password}
              />
            </TitleWrapper>

            <ButtonsContainer>
              <Button disabled={this.state.isLoading} text="Cadastrar" onPress={this.onSubmit} />
            </ButtonsContainer>
          </Container>
      </Wrapper>
    );
  }
}

export default graphql(REGISTER_MUTATION)(SignUp);
