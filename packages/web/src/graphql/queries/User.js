import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
    query getUser($_id: ID!) {
        user(_id: $_id) {
            _id
            author {
                _id
                email
            }
        }
    }
`;

export const GET_ALL_USERS_QUERY = gql`
    query getAllUsers {
        users {
            _id
            email
            posts {
                _id
                title
                body
                published
            }
        }
    }
`;
