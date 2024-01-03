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

export const GET_ALL_CATEGORIES = gql`
query{
  getCategories {
    name
    id
    parentId
    isActive
    description
    subcategories {
      name
      id
      parentId
      isActive
      description
    }
  }
}
`;

export const GET_CATEGORY = gql`
query($categoryId: ID!){
  getCategory(id: $categoryId) {
    name
    id
    parentId
    isActive
    description
    subcategories {
      name
      id
      parentId
      isActive
      description
    }
  }
}
`;
