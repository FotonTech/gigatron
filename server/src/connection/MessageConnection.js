

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import MessageType from '../type/MessageType';

export default connectionDefinitions({
  name: 'Message',
  nodeType: MessageType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
