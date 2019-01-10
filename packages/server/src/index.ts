import { ApolloServer } from 'apollo-server';
import { GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';
import rootQuery from './modules/rootQuery';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...rootQuery
    }
  })
})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
