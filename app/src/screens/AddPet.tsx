
import React, { Component } from 'react';
import { ScrollView, Alert, Platform } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styled from 'styled-components';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Header from '../components/Header';
import { RouteNames } from '../config/Router';
import { SafeArea } from '../utils';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const MUTATION = gql`
  mutation PetAddMutation($input: PetAddInput!) {
    PetAdd(input: $input) {
      status
      message
      error
      clientMutationId
    }
  }
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

class AddPet extends Component {
  state = {
    name: '',
    type: '',
    race: '',
    alergic: '',
    castrated: true,
    date: '',
    doctor: '',
    birthDate: '',
    port: '',
    color: '',
    gender: '',
    isLoading: false,
  };

  onChangeField = (targetField: string, value: string) => {
    this.setState({
      [targetField]: value,
    });
  };

  onSubmit = async () => {
    const { name, type, race, alergic, castrated, doctor, birthDate, port, color, gender } = this.state;

    const onCompleted = async res => {
      console.log('resss', res);
      const response = res && res.PetAdd;
      if (response && response.error) {
        this.setState({
          isLoading: false,
        });
        return Alert.alert('Erro', 'Usuario ou senha invalidos!');
      } else if (response && response.message) {
        return this.props.navigation.navigate(RouteNames.Home);
      }
    };
    const onError = () => {
      this.setState({
        isLoading: false,
      });
      return Alert.alert('Erro', 'Verifique sua conexão com a internet');
    };

    const alergicArray = alergic && alergic.split(' ');
    this.props
      .mutate({
        variables: {
          input: { name, type, race, castrated, doctor, alergic: alergicArray, birthDate, port, color, gender },
        },
      })
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
        <ScrollView>
          <Container>
            <Header title="Novo Pet" description="Adicione um novo pet" onPress={this.onSubmit} />
            <Input
              placeholder="Name"
              onChangeText={value => this.onChangeField('name', value)}
              value={this.state.name}
            />
            <Input
              placeholder="Type"
              onChangeText={value => this.onChangeField('type', value)}
              value={this.state.type}
            />
            <Input
              placeholder="Breed"
              onChangeText={value => this.onChangeField('race', value)}
              value={this.state.race}
            />
            <Input
              placeholder="Allergies"
              onChangeText={value => this.onChangeField('alergic', value)}
              value={this.state.alergic}
            />
            <Checkbox
              placeholder="Castrated"
              onValueChange={value => this.onChangeField('castrated', value)}
              value={this.state.castrated}
            />
            <Input
              placeholder="Doctor"
              onChangeText={value => this.onChangeField('doctor', value)}
              value={this.state.doctor}
            />
            <Input
              placeholder="Birth date"
              onChangeText={value => this.onChangeField('birthDate', value)}
              value={this.state.birthDate}
            />
            <Input
              placeholder="Port"
              onChangeText={value => this.onChangeField('port', value)}
              value={this.state.port}
            />
            <Input
              placeholder="Color"
              onChangeText={value => this.onChangeField('color', value)}
              value={this.state.color}
            />
            <Input
              placeholder="Gender"
              onChangeText={value => this.onChangeField('gender', value)}
              value={this.state.gender}
            />
          </Container>
        </ScrollView>
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </Wrapper>
    );
  }
}

export default graphql(MUTATION)(AddPet);
