const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Comment {
  id: ID!
  text: String!
  post: Post!
  user: User!
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  description: String!
  content: String!
  creator: User!
  comments: [Comment!]!
  createdAt: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String
  createdPosts: [Post!]!
}

input PostInput {
  title: String!
  description: String!
  content: String!
}

input UserInput {
  email: String!
  password: String!
  name: String!
}

type RootQuery {
  posts: [Post!]!
  post(id: String!): Post!
  users: [User!]!
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