import { gql } from "@apollo/client";

export const GET_ALL_STORES = gql`
  query GET_ALL_STORES {
    getAllStores {
      id
      name
      slug
      description
    }
  }
`;

export const GET_A_STORE = gql`
  query GET_A_STORE($vendorId: String!) {
    getAStore(id: $vendorId) {
      id
      name
      slug
      description
    }
  }
`;


