

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';

import UserType from './UserType';
import PetType from './PetType';
import ConversationType from './ConversationType';
import { NodeField } from '../interface/NodeInterface';
import {
  UserLoader,
  PetLoader,
  ConversationLoader,
  MessageLoader,
} from '../loader';
import UserConnection from '../connection/UserConnection';
import PetConnection from '../connection/PetConnection';
import ConversationConnection from '../connection/ConversationConnection';
import MessageConnection from '../connection/MessageConnection';
import type { UserType as UserFlowTypes, UserConnection as UserConnectionFlowTypes } from '../loader/UserLoader';
import type { PetType as PetFlowTypes } from '../type/PetType';
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
      resolve: (obj, args: ConnectionArguments, context: GraphQLContext) =>
        PetLoader.loadPets(context, args),
    },
    conversation: {
      type: ConversationType,
      args: {
        conversationId: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, args, context: GraphQLContext): Promise<?PetFlowTypes> =>
        ConversationLoader.load(context, args.conversationId),
    },
    conversations: {
      type: ConversationConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, args: ConnectionArguments, context: GraphQLContext) =>
        ConversationLoader.loadConversations(context, args),
    },
    messages: {
      type: MessageConnection.connectionType,
      args: {
        ...connectionArgs,
      },
      resolve: (obj, args: ConnectionArguments, context: GraphQLContext) =>
        MessageLoader.loadMessages(context, args),
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
