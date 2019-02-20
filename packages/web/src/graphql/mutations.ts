import gql from "graphql-tag";

export const loginUser = gql`
    mutation loginUser($input: LoginUserInput!) {
        loginUser(input: $input) {
            token
            error
        }
    }
`;

export const addUser = gql`
    mutation addUser($input: AddUserInput!) {
        addUser(input: $input) {
            token
            error
        }
    }
`;
