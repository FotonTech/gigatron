import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { Message, Conversation } from '../model';
import MessageType from '../type/MessageType';

export default mutationWithClientMutationId({
  name: 'AddMessage',
  inputFields: {
    conversation: {
      type: new GraphQLNonNull(GraphQLID),
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ conversation, text }, { user }) => {
    const currentConversation = await Conversation.findOne({ id: conversation });


    if (Message) {
      return {
        error: 'Message already exists',
        id: Message._id,
      };
    }

    const newMessage = new Message({
      owner: user._id,
      text,
      conversation,
    });
    await newMessage.save();

    await Conversation.findByIdAndUpdate(
      { id: conversation },
      { messages: [newMessage, ...currentConversation.messages] },
    );
    const { _id } = newMessage;

    return {
      error: null,
      status: true,
      Message: await Message.findOne({ _id }),
    };
  },
  outputFields: {
    status: {
      type: GraphQLBoolean,
      resolve: ({ status }) => status,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
    message: {
      type: MessageType,
      resolve: ({ Message }) => Message,
    },
  },
});
