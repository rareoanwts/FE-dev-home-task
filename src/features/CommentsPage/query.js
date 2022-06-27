import { gql } from '@apollo/client';

const getIssueComments = ({ userId, repoName, issueNumber }) => gql`
query {
    repository(owner: "${userId}", name: "${repoName}") {
      issue(number: ${issueNumber}) {
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
        comments(first: 100) {
            totalCount
            edges {
            node {
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

export { getIssueComments };
