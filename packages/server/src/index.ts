import { ApolloServer } from 'apollo-server';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import rootQuery from './modules/rootQuery';
import rootMutation from './modules/rootMutation';
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...rootQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    // @ts-ignore
    fields: {
      ...rootMutation
    }
  })
})

mongoose.connect(process.env.MONGOURL)
mongoose.connection.once("open", () => {
  console.log("conneted to database")
})

const server = new ApolloServer({ schema });
const port = normalizePort(process.env.PORT || '4000')

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

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