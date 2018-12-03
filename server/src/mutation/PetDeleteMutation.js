

import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Pet } from '../model';
import type { GraphQLContext } from '../TypeDefinition';

type MutationArgs = {
  id: string,
};

type MutationReturn = {
  error: string | null,
  message: string,
  status: boolean,
};

export default mutationWithClientMutationId({
  name: 'PetDelete',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id }: MutationArgs, { user }: GraphQLContext): Promise<?MutationReturn> => {
    if (!user) {
      return {
        error: 'Unauthenticated',
        message: 'Oops me parece que você não esta logado! Por Favor Refaça o Login',
        status: false,
      };
    }

    const pet = Pet.findOne({
      _id: id,
    });

    await pet.update({
      active: false,
    });

    return {
      error: null,
      message: 'Seu pet foi removido com sucesso!!',
      status: true,
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
  },
});
