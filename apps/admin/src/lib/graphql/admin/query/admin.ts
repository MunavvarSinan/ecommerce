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