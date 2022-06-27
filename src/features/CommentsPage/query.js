import { gql } from '@apollo/client';

const getIssueComments = ({ userId, repoName, issueNumber }) => gql`
query {
    repository(owner: "${userId}", name: "${repoName}") {
      issue(number: ${issueNumber}) {
        id
        title
        closed
        createdAt
        number
        assignees(first: 1) {
            edges {
                node {
                    ... on User {
                        login
                        avatarUrl
                    }
                }
            }
        }
        labels(first: 10) {
            edges {
            node {
                description
            }
            }
        }
        participants(first: 10) {
            edges {
                node {
                    ... on User {
                        login
                        avatarUrl
                    }
                }
            }
        }
        milestone {
            id
        }
        author {
            ... on User {
                name
                login
            }
        }
        comments(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            edges {
            node {
                id
                bodyText
                bodyHTML
                createdAt
                author {
                ... on User {
                    name
                    login
                    avatarUrl
                }
                }
            }
            }
        }
        }
    }
}
`;

const ADD_COMMENT = gql`
  mutation AddComment($clientMutationId: String, $subjectId: ID!, $body: String!) {
    addComment(input: { clientMutationId: $clientMutationId, subjectId: $subjectId, body: $body }) {
      clientMutationId
      commentEdge {
        node {
          body
          repository {
            id
            name
            nameWithOwner
          }
          issue {
            number
          }
        }
      }
    }
  }
`;

export { getIssueComments, ADD_COMMENT };
