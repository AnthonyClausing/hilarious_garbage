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

type AuthPayload {
  token: String
  user: User
}

input PostInput {
  title: String!
  description: String!
  content: String!
}

input CommentInput {
  postId: String!
  text: String!
  userId: String!
}

type RootQuery {
  posts: [Post!]!
  post(id: String!): Post!
  users: [User!]!
}

type RootMutation {
  createPost(postInput: PostInput): Post
  addComment(commentInput: CommentInput): [Comment!]!
  signup(name: String!, password: String!, email: String): AuthPayload
  login(name: String!, password: String!): AuthPayload
}

schema {
  query: RootQuery 
  mutation: RootMutation
}
`)