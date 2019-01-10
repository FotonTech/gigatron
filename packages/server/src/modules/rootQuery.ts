import UserType from './user/UserType';
import { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID} from 'graphql';

export default {
  users: {
    type: GraphQLList(UserType),
    resolve: () => ['user1', 'user2', 'user3']
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLNonNull(GraphQLID),
      },
    },
    resolve: (object, args, ctx) => ({
      name: 'Jabur',
      pass: 'J123',
    })// UserModel.find({ id: args.id })
  }
}