import { gql } from "@apollo/client/core";

export const GET_ADMIN = gql`
  query ($id: ID!, $role: String!) {
    getAdmin(id: $id, role: $role) {
      name
      email
      id
    }
  }
`;

export const GET_ALL_VENDORS = gql`
  query {
    getVendors {
      email
      id
      name
      address
      phone
      role
      stores {
        id
        name
        slug
        description
      }
    }
  }
`;
