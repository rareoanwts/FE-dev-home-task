import { gql } from '@apollo/client';

const getUserProfile = (userId) => gql`
query {
  repositoryOwner(login: "${userId}") {
    login
    ... on User {
      id,
      bio,
      name,
      avatarUrl,
      followers {
        totalCount
      },
      projects {
        totalCount
      },
      packages {
        totalCount
      },
      starredRepositories {
        totalCount
      }
      following(first: 1) {
        totalCount
        edges {
          node {
            id
          }
        }
      },
      email,
      twitterUsername,
      pinnedItems(first: 100) {
        totalCount
        edges {
              node {
                  ... on Repository {
                    name
                    url
                    isPrivate
                    description
                    forkCount
                    stargazerCount
                    primaryLanguage {
                      name
                    }
                  }
              }
          }
      },
      repositories {
        totalCount
      }
    }
  }
}
`;

export const query = gql`
  query {
    repository(owner: "octocat", name: "Hello-World") {
      issues(last: 20, states: CLOSED) {
        edges {
          node {
            title
            url
            labels(first: 5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { getUserProfile };
