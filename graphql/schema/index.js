const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type comment {
  id: ID!
  post: Post!
  user: User!
  createdAt: String!
  updatedAt: String!
}
type Post {
  id: ID!
  title: String!
  description: String!
  content: String!
  date: String!
  creator: User!
}
type User {
  id: ID!
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
  login(email: String!, password: String!): User!
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