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

export const GET_STORE = gql`
  query GET_STORE($vendorId: String!, $storeId: String) {
    getStore(vendorId: $vendorId, storeId: $storeId) {
      id
      name
      slug
      description
    }
  }
`;


