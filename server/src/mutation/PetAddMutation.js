// @flow

import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Pet } from '../model';
import PetType from '../type/PetType';
import type { PetType as PetFlowTypes } from '../type/PetType';
import type { GraphQLContext } from '../TypeDefinition';

type MutationArgs = {
  name: string,
  owner: string,
  castrated: boolean,
  alergic: string,
  doctor: string,
  race: string,
  type: string,
  image: string,
  gender: string,
  port: string,
  birthDate: string,
  color: string,
};

type MutationReturn = {
  error: string | null,
  message: string,
  status: boolean,
  pet: PetFlowTypes | null,
};

export default mutationWithClientMutationId({
  name: 'PetAdd',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    castrated: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    alergic: {
      type: new GraphQLList(GraphQLString),
    },
    gender: {
      type: new GraphQLNonNull(GraphQLString),
    },
    port: {
      type: new GraphQLNonNull(GraphQLString),
    },
    birthDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    color: {
      type: new GraphQLNonNull(GraphQLString),
    },
    doctor: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    race: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    { name, castrated, alergic, doctor, race, type, image, gender, port, birthDate, color }: MutationArgs,
    { user }: GraphQLContext,
  ): Promise<?MutationReturn> => {
    if (!user) {
      return {
        error: 'Unauthenticated',
        message: 'Oops me parece que você não esta logado! Por Favor Refaça o Login',
        status: false,
        pet: null,
      };
    }

    const pet = new Pet({
      name,
      owner: user._id,
      castrated,
      alergic,
      doctor,
      race,
      type,
      image,
      gender,
      port,
      birthDate,
      color,
    });
    await pet.save();

    const { _id } = pet;

    return {
      error: null,
      message: 'Seu novo pet foi cadastrado com sucesso!',
      status: true,
      pet: await Pet.findOne({ _id }),
    };
  },
  outputFields: {
    status: {
      type: GraphQLBoolean,
      resolve: ({ status }: MutationReturn) => status,
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }: MutationReturn) => message,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: MutationReturn) => error,
    },
    pet: {
      type: PetType,
      resolve: ({ pet }: MutationReturn) => pet,
    },
  },
});
