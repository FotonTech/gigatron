
//graphql(query)
import graphql from './graphql';
import Koa from 'koa';
const app = new Koa();

app.use(async (ctx: any) => {
	const { method, url } = ctx;
	//change to POST
	if(method === 'GET' && url === '/graphql') {
		/*
		const exampleQuery = '{ hello }';

		const result = await graphql(exampleQuery)
		ctx.body = result;
		*/
		ctx.body = ctx;
	}

});

app.listen(3000);