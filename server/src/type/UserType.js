// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

export type UserType = {
  id: string,
  _id: string,
  name: string,
  password: string,
  email: string,
  active: boolean,
};

export default new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    active: {
      type: GraphQLBoolean,
      resolve: user => user.active,
    },
  }),
  interfaces: () => [NodeInterface],
});
