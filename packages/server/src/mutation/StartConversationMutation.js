import { GraphQLString, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { Conversation, User } from '../model';
import ConversationType from '../type/ConversationType';

export default mutationWithClientMutationId({
  name: 'StartConversation',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email }, { user }) => {
    const conversation = await Conversation.findOne({ email: email.toLowerCase() });
    const otherUser = await User.findOne({ email: email.toLowerCase() });

    if (conversation) {
      return {
        error: 'Conversation already exists',
        id: conversation._id,
      };
    }

    const newConversation = new Conversation({
      owner: user,
      otherUser,
    });
    await newConversation.save();

    const { _id } = newConversation;

    return {
      error: null,
      message: 'Your conversation started',
      status: true,
      conversation: await Conversation.findOne({ _id }),
    };
  },
  outputFields: {
    status: {
      type: GraphQLBoolean,
      resolve: ({ status }) => status,
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    conversation: {
      type: ConversationType,
      resolve: ({ conversation }) => conversation,
    },
  },
});
