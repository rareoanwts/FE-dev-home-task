import { gql } from '@apollo/client';

const getIssuesTotalCount = (userId, repoName) => gql`
query {
    repositoryOwner (login: "${userId}") {
    	repository(name: "${repoName}") {
            issues {
                totalCount
            }
        }
    }
}`;

const getIssuesByRepoName = ({ userId, repoName }) => gql`
query {
    repository(owner: "${userId}", name: "${repoName}") {
      open: issues(states:OPEN) {
        totalCount
      }
      closed: issues(states:CLOSED) {
        totalCount
      }
      issues(first: 30, states:OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        edges {
          node {
            id
            number
            closed
            title
            createdAt
            author {
              ... on User {
                login
              }
            }
            comments(first: 100) {
              totalCount
              edges {
                node {
                  bodyText
                  author {
                    ... on User {
                      name
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { getIssuesByRepoName, getIssuesTotalCount };
