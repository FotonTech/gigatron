import { ApolloServer, PubSub } from 'apollo-server';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import rootQuery from './modules/rootQuery';
import rootMutation from './modules/rootMutation';
import { connectToMongo } from './utils/db/mongo';
import * as dotenv from 'dotenv';
import { getUser } from './utils/auth/authMethods';

const pubsub = new PubSub()

dotenv.config()

connectToMongo()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...rootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      ...rootMutation
    }
  })
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        ...connection.context,
        pubsub,
      }
    } else {
      // check from req
      const token = req.headers.authorization ? req.headers.authorization : ''
      const me = await getUser(token)
      return {
        me,
        pubsub,
      }
    }
  },
});


function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return port
  }

  if (port >= 0) {
    return port
  }

  return false
}
const port = normalizePort(process.env.PORT || '4000')

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
