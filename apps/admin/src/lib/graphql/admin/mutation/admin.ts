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

export const CREATE_CATEGORY = gql`
mutation($name: String!, $parentId: String){
  createCategory(name: $name, parentId: $parentId) {
    name
    id
    parentId
    isActive
    description
    subcategories {
      id
      name
      parentId
      isActive
      description
    }
  }
}
`

export const DELETE_CATEGORY = gql`
mutation($id: String!){
  deleteCategory(id: $id) {
    name
    id
    parentId
    isActive
    description
    subcategories {
      id
      name
      parentId
      isActive
      description
    }
  }
}
`
