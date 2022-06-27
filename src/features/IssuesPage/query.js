import { gql } from '@apollo/client';

const getIssuesByRepoName = ({ userId, repoName }) => gql`
query {
    repository(owner: "${userId}", name: "${repoName}") {
      id
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

const CREATE_ISSUE = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $repositoryId, title: $title, body: $body }) {
      issue {
        number
        body
      }
    }
  }
`;

export { getIssuesByRepoName, CREATE_ISSUE };
