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
}`

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
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`

export const GET_REVIEWS = gql`
query Reviews($repositoryId: ID!){
  repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`

export const ME = gql`
query Me{
    me {
        id
        username
    }
}`;