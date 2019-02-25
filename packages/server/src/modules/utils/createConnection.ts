import { GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLBoolean } from 'graphql';


export default (GraphQLtype, connectionName: string) => new GraphQLObjectType({
  name: connectionName,
  fields: {
    edges: {
      type: GraphQLList(GraphQLtype),
      resolve: (o) => o.edges
    },
    hasNextPage: {
      type: GraphQLBoolean,
      resolve: (o) => o.hasNextPage,
    },
    totalCount: {
      type: GraphQLInt,
      resolve: (o) => o.totalCount,
    }
  }
})