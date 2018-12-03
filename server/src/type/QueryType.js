// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';

import UserType from './UserType';
import PetType from './PetType';
import { NodeField } from '../interface/NodeInterface';
import {
  UserLoader,
  PetLoader,
} from '../loader';
import UserConnection from '../connection/UserConnection';
import PetConnection from '../connection/PetConnection';
import type { UserType as UserFlowTypes, UserConnection as UserConnectionFlowTypes } from '../loader/UserLoader';
import type { PetType as PetFlowTypes } from '../type/PetType';
import type { PetConnection as PetConnectionFlowTypes } from '../loader/PetLoader';
import type { GraphQLContext, ConnectionArguments } from '../TypeDefinition';

type PetQueryInput = {
  petId: string,
};

type UserQueryInput = {
  id: string,
};

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (root, args: Object, context: GraphQLContext): Promise<?UserFlowTypes> | null =>
        (context.user ? UserLoader.load(context, context.user._id) : null),
    },
    pet: {
      type: PetType,
      args: {
        petId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args: PetQueryInput, context: GraphQLContext): Promise<?PetFlowTypes> =>
        PetLoader.load(context, args.petId),
    },
    pets: {
      type: PetConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, args: ConnectionArguments, context: GraphQLContext): Promise<?PetConnectionFlowTypes> =>
        PetLoader.loadPets(context, args),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args: UserQueryInput, context: GraphQLContext): Promise<?UserFlowTypes> | null =>
        UserLoader.load(context, fromGlobalId(args.id).id),
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args: ConnectionArguments, context: GraphQLContext): Promise<?UserConnectionFlowTypes> =>
        UserLoader.loadUsers(context, args),
    },
  }),
});
