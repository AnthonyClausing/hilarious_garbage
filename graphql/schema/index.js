const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type comment {
  _id: ID!
  post: Post!
  user: User!
  createdAt: String!
  updatedAt: String!
}
type Post {
  _id: ID!
  title: String!
  description: String!
  text: String!
  date: String!
  creator: User!
}
type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  createdPosts: [Post!]
}
input PostInput {
  title: String!
  description: String!
  text: String!
  date: String!
}
input UserInput {
  email: String!
  password: String!
  name: String!
}
type RootQuery {
  posts: [Post!]!
  login(email: String!, password: String!): AuthData!
}
type RootMutation {
  createPost(postInput: PostInput): Post
  createUser(userInput: UserInput): User
}
schema {
  query: RootQuery 
  mutation: RootMutation
}
`)