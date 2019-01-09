import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
  	GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
		  hello: {
				type: GraphQLString,
				resolve: () => 'morning'
		  }
		}
	})
});


export default async (query: string) => graphql(schema, query)
