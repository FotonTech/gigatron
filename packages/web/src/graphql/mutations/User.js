import gql from "graphql-tag";

export const SIGN_UP_USER_MUTATION = gql`
    mutation signUpUser($email: String!, $password: String!) {
        signUpUser(email: $email, password: $password) {
            token
            errors {
                value
            }
        }
    }
`;

export const SIGN_IN_USER_MUTATION = gql`
    mutation signInUser($email: String!, $password: String!) {
        signInUser(email: $email, password: $password) {
            token
            errors {
                value
            }
        }
    }
`;
