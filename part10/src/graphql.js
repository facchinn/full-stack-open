import { gql } from '@apollo/client'
export const REPOSITORY_FIELDS = gql`fragment RepositoryFields on Repository { id fullName description language forksCount stargazersCount ratingAverage reviewCount ownerAvatarUrl url }`
export const GET_REPOSITORIES = gql`query Repositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) { repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) { edges { node { ...RepositoryFields } cursor } pageInfo { endCursor hasNextPage } } } ${REPOSITORY_FIELDS}`
export const GET_REPOSITORY = gql`query Repository($id: ID!, $first: Int, $after: String) { repository(id: $id) { ...RepositoryFields reviews(first: $first, after: $after) { edges { node { id text rating createdAt user { id username } } cursor } pageInfo { endCursor hasNextPage } } } } ${REPOSITORY_FIELDS}`
export const ME = gql`query Me($includeReviews: Boolean = false) { me { id username reviews @include(if: $includeReviews) { edges { node { id text rating createdAt repository { id fullName } } } } } }`
export const AUTHORIZE = gql`mutation Authorize($credentials: AuthorizeInput!) { authorize(credentials: $credentials) { accessToken } }`
export const CREATE_REVIEW = gql`mutation CreateReview($review: CreateReviewInput!) { createReview(review: $review) { id repositoryId } }`
export const DELETE_REVIEW = gql`mutation DeleteReview($id: ID!) { deleteReview(id: $id) }`
