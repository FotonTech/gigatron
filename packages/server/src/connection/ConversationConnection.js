

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import ConversationType from '../type/ConversationType';

export default connectionDefinitions({
  name: 'Conversation',
  nodeType: ConversationType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
