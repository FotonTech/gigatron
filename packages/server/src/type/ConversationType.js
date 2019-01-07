

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';
import UserType from './UserType';
import MessageType from './MessageType';
import { UserLoader } from '../loader';
import { MessageLoader } from '../loader';
import type { UserType as UserFlowType } from '../loader/UserLoader';

export type ConversationType = {
  id: string,
  _id: string,
  messages: Array<string>,
  owner: UserFlowType,
  otherUser: UserFlowType,
  lastMessage: string,
};

export default new GraphQLObjectType({
  name: 'Conversation',
  description: 'Conversation data',
  fields: () => ({
    id: globalIdField('Conversation'),
    _id: {
      type: GraphQLString,
      resolve: (conversation: ConversationType) => conversation._id,
    },
    owner: {
      type: UserType,
      resolve: ({ owner }: ConversationType, args, context) => UserLoader.load(context, owner),
    },
    otherUser: {
      type: UserType,
      resolve: ({ otherUser }: ConversationType, args, context) => UserLoader.load(context, otherUser),
    },
    lastMessage: {
      type: GraphQLString,
      resolve: (conversation: ConversationType) => conversation.lastMessage,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (conversation: ConversationType) => conversation.updatedAt,
    },
    messages: {
      type: MessageType,
      resolve: ({ owner }: ConversationType, args, context) => MessageLoader.load(context, owner),
    },
  }),
  interfaces: () => [NodeInterface],
});
