import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;

export const GET_USER = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`;

export const REPOSITORY = gql`
  query getCurrentRepository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      url
    }
  }

  ${REPOSITORY_DETAILS}
`;
