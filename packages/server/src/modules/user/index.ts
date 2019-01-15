import UserType from './UserType';
import * as Loader from './UserLoader';
import createConnection from '../utils/createCoonnection';

import { GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';

export default {
  users: {
    type: createConnection(UserType, 'UserConnection'),
    args: {
      size: {
        type: GraphQLNonNull(GraphQLInt),
      },
      page: {
        type: GraphQLNonNull(GraphQLInt),
      }
    },
    resolve: Loader.Users
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: Loader.User
  }
}