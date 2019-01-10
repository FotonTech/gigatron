import { ApolloServer } from 'apollo-server';
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  })
})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
