import UserType from './UserType';
import UserModel from './UserModel';
import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLBoolean} from 'graphql';

const UserConnectionType = new GraphQLObjectType({
  name: 'UserConnection',
  fields: {
    edges: {
      type: GraphQLList(UserType),
      resolve: (o) => o.edges
    },
    hasNextPage: {
      type: GraphQLBoolean,
      resolve: (o) => o.hasNextPage,
    }
  }
})

export default {
  users: {
    type: UserConnectionType,
    args: {
      size: {
        type: GraphQLNonNull(GraphQLInt),
      },
      page: {
        type: GraphQLNonNull(GraphQLInt),
      }
    },
    resolve: async (object, args, ctx) => {
      const { id, size, page } = args;
      const where = { id }
      const offset = page * size;

      const totalCount = await UserModel.count(where)
      const hasNextPage = (Number(totalCount) >= offset);

      const edges = await UserModel
        .find(where)
        .limit(size)
        .skip(offset)

      return {
        edges,
        hasNextPage
      }
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (object, args, ctx) => UserModel.findOne({ id: args.id })
  }
}