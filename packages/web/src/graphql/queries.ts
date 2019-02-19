import gql from "graphql-tag";

export const users = gql`
    query users($size: Int!, $page: Int!) {
        users(size: $size, page: $page) {
            edges {
                name
                email
            }
            hasNextPage
        }
        me {
            name
        }
    }
`;
