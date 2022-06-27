import { gql } from '@apollo/client';

const getRepositories = (userId, page) => gql`
query {
    repositoryOwner (login: "${userId}") {
      repositories(first: 30, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            isPrivate
            description
            updatedAt
            issues {
              totalCount
            }
            forkCount
            stargazerCount
            primaryLanguage {
                name
            }
          }
        }
      }
    }
  }
`;

export { getRepositories };
