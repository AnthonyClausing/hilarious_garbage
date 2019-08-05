const { Post, User } = require('../../db/models');
const { commentMapper } = require('./merge')

module.exports = {
  
  posts: async () => {
    const posts = await Post.findAll()
    return await posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        contentType: post.contentType,
        imageId: post.imageId,
        createdAt: post.createdAt
      }
    })
  },
  post: async({id}) => {
    const post = await Post.findByPk(id)
    const comments  = await post.getComments({include: User})
    const creator = await User.findByPk(post.userId)
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      contentType: post.contentType,
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
        contentType: postData.postInput.contentType,
        imageId: postData.postInput.imageId,
        userId: "1"
      })
      return createdPost
    } catch (err) {
      console.log(err)
    }
  }
}