import gql from "graphql-tag";

export const GET_POST_QUERY = gql`
    query getPost($_id: ID!) {
        post(_id: $_id) {
            _id
            author {
                _id
                email
            }
        }
    }
`;

export const GET_ALL_POSTS_QUERY = gql`
    query getAllPosts {
        posts {
            _id
            author {
                _id
                email
            }
        }
    }
`;
