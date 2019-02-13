import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $title: String!
        $body: String!
        $published: Boolean!
        $author: ID!
    ) {
        createPost(
            title: $title
            body: $body
            published: $published
            author: $author
        ) {
            title
            body
            published
            author {
                _id
                email
            }
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($_id: ID!) {
        deletePost(_id: $_id) {
            title
            body
            published
            author {
                _id
                email
            }
        }
    }
`;
