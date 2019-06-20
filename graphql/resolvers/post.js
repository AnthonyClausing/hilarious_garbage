const {Post, User, Comment} = require('../../db/models');

function commentMapper(comments) {
  return comments.map(comment => {
    return {
      id: 5,
      text: comment.text,
      createdAt: comment.createdAt,
      user: comment.user
    }
  })
}
module.exports = {
  
  posts: async () => {
    const posts = await Post.findAll()
    return await posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        createdAt: post.createdAt
      }
    })
  },
  post: async({id}) => {
    const post = await Post.findByPk(id)
    const comments  = await post.getComments({include : User})
    const creator = await User.findByPk(post.userId)
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      creator,
      comments : commentMapper(comments)
    }
  },

  createPost: async (postData) => {
    try{
      const createdPost = await Post.create({
        title: postData.postInput.title, 
        description: postData.postInput.description, 
        content: postData.postInput.content,
        creatorId: 1
      })
      return createdPost
    } catch (err) {
      console.log(err)
    }
  }
}