import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_DETAILS}
`;

export const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repository {
              fullName
              id
            }
          }
        }
      }
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

export const GET_REVIEWS = gql`
  query getReviews($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            rating
            text
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;
