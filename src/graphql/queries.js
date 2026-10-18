import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
query RepoInfo {
  repositories {
    edges {
      node {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
  }
}
`

export const GET_REPOSITORY = gql`
query SingleRepo($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
}
`

export const ME = gql`
query Me{
    me {
        id
        username
    }
}`;