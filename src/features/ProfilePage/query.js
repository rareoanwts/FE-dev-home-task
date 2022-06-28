import { gql } from '@apollo/client';

const getUserProfile = (userId) => gql`
query {
  user(login: "${userId}") {
    id,
    bio,
    name,
    avatarUrl,
    login
    followers {
      totalCount
    },
    projects {
      totalCount
    },
    packages {
      totalCount
    },
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
  }
}
`;

const getRepositories = (userId) => gql`
query {
  repositoryOwner(login: "${userId}") {
    login
    ... on User {
      starredRepositories {
        totalCount
      }
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
      repositories(first: 10) {
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
      }
    }
  }
}
`;

export { getUserProfile, getRepositories };
