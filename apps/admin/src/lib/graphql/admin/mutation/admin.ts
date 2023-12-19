import { gql } from "@apollo/client";

export const ADD_VENDOR = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
    $address: String!
  ) {
    createVendor(
      name: $name
      email: $email
      password: $password
      phone: $phone
      address: $address
    ) {
      id
      name
      email
      phone
      address
      stores {
        name
      }
    }
  }
`;
