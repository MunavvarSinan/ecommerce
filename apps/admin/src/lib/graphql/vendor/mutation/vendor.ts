import { gql } from '@apollo/client/core';

export const CREATE_STORE = gql`
    mutation CREATE_STORE($name: String!, $description: String, $vendorId: String!) {
        createStore(name: $name, description: $description, vendorId: $vendorId) {
            id
            name
            slug
            description
        }
    }
`;
