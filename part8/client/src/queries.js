import { gql } from '@apollo/client'
export const ALL_AUTHORS = gql`query { allAuthors { name born bookCount id } }`
export const ALL_BOOKS = gql`query AllBooks($genre: String) { allBooks(genre: $genre) { title published genres id author { name id } } }`
export const ME = gql`query { me { username favoriteGenre id } }`
export const EDIT_AUTHOR = gql`mutation EditAuthor($name: String!, $born: Int!) { editAuthor(name: $name, setBornTo: $born) { name born bookCount id } }`
export const ADD_BOOK = gql`mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) { addBook(title: $title, author: $author, published: $published, genres: $genres) { title published genres id author { name id } } }`
export const LOGIN = gql`mutation Login($username: String!, $password: String!) { login(username: $username, password: $password) { value } }`
export const BOOK_ADDED = gql`subscription { bookAdded { title published genres id author { name id } } }`
