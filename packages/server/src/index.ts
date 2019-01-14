import { ApolloServer } from 'apollo-server';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import rootQuery from './modules/rootQuery';
import * as mongoose from "mongoose";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...rootQuery
    }
  })
})

mongoose.connect("")
mongoose.connection.once("open", () => {
  console.log("conneted to database")
})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
