import { gql } from '@apollo/client';

export const ME = gql`
  query ME{
    me {
      ... on Admin {
        name
        email
      }
      ... on Vendor {
        name
        email
      }
    }
  }
`;
