

import { GraphQLInt } from 'graphql';

import { connectionDefinitions } from 'graphql-relay';

import PetType from '../type/PetType';

export default connectionDefinitions({
  name: 'Pet',
  nodeType: PetType,
  connectionFields: {
    count: {
      type: GraphQLInt,
    },
  },
});
