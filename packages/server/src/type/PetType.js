

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';
import UserType from './UserType';
import { UserLoader } from '../loader';
import type { UserType as UserFlowType } from '../loader/UserLoader';

export type PetType = {
  id: string,
  _id: string,
  image: string,
  name: string,
  gender: string,
  castrated: boolean,
  alergic: Array<string>,
  owner: UserFlowType,
  doctor: string,
  race: string,
  type: string,
  active: Boolean,
  port: string,
  birthDate: string,
  color: string,
};

export default new GraphQLObjectType({
  name: 'Pet',
  description: 'Pet data',
  fields: () => ({
    id: globalIdField('Pet'),
    _id: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet._id,
    },
    image: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.image,
    },
    owner: {
      type: UserType,
      resolve: ({ owner }: PetType, args, context) => UserLoader.load(context, owner),
    },
    name: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.name,
    },
    gender: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.gender,
    },
    port: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.port,
    },
    birthDate: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.birthDate,
    },
    color: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.color,
    },
    castrated: {
      type: GraphQLBoolean,
      resolve: (pet: PetType) => pet.castrated,
    },
    alergic: {
      type: new GraphQLList(GraphQLString),
      resolve: (pet: PetType) => pet.alergic,
    },
    race: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.race,
    },
    type: {
      type: GraphQLString,
      resolve: (pet: PetType) => pet.type,
    },
  }),
  interfaces: () => [NodeInterface],
});
