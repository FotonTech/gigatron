

import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Conversation } from '../model';
import PetType from '../type/PetType';
import type { PetType as PetFlowTypes } from '../type/PetType';
import type { GraphQLContext } from '../TypeDefinition';

type MutationReturn = {
  error: string | null,
  message: string,
  status: boolean,
  pet: PetFlowTypes | null,
};

export default mutationWithClientMutationId({
  name: 'ConversationAdd',
  inputFields: {
    owner: {
      type: new GraphQLNonNull(GraphQLID),
    },
    otherUser: {
      type: new GraphQLNonNull(GraphQLID),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    { owner, otherUser, message },
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

    const conversation = new Conversation({
      owner,
      otherUser,
      messages: [message],
    });
    await conversation.save();

    const { _id } = conversation;

    return {
      error: null,
      message: 'Your new conversation was created',
      status: true,
      conversation: await Conversation.findOne({ _id }),
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
    conversation: {
      type: PetType,
      resolve: ({ conversation }: MutationReturn) => conversation,
    },
  },
});
