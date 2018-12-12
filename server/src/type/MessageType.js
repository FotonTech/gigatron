

import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';
import UserType from './UserType';
import { UserLoader } from '../loader';
import { MessageLoader } from '../loader';
import type { UserType as UserFlowType } from '../loader/UserLoader';

export type messageType = {
  id: string,
  _id: string,
  owner: UserFlowType,
  text: string,
};

export default new GraphQLObjectType({
  name: 'Message',
  description: 'message data',
  fields: () => ({
    id: globalIdField('Message'),
    _id: {
      type: GraphQLString,
      resolve: (message: messageType) => message._id,
    },
    owner: {
      type: UserType,
      resolve: ({ owner }: messageType, args, context) => UserLoader.load(context, owner),
    },
    text: {
      type: GraphQLString,
      resolve: (message: messageType) => message.text,
    },
  }),
  interfaces: () => [NodeInterface],
});
