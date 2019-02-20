import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
        );
    }

    if (networkError) {
        console.log(
            `[Network error ${operation.operationName}]: ${
                networkError.message
            }`
        );
    }
});

const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists.
    const token = localStorage.getItem("token");
    // Return the headers to the context so httpLink can read them.
    return {
        headers: {
            ...headers,
            Authorization: token ? token : null
        }
    };
});

const httpLink = new HttpLink({ uri: "https://gigatron.now.sh/graphql" });

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache
});

export default client;
