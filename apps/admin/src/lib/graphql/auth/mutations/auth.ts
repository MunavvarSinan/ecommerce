import { gql } from '@apollo/client/core';

export const ADMIN_LOGIN = gql`
   mutation AdminLogin($email: String!, $password: String!){
     adminLogin(email: $email, password: $password) {
         authToken
    }
   }
`