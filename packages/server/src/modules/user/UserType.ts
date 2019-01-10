import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID} from 'graphql';
import UserModel from './UserModel';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    name: {
      type: GraphQLString,
      resolve: (o) => o.name
    },
    password: {
      type: GraphQLString,
      resolve: (o) => o.password
    },
    email: {
      type: GraphQLString,
      resolve: (o) => o.email
    }
  }
})

export default UserType;