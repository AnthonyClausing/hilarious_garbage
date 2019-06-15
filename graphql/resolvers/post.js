const {Post, User, Comment} = require('../../db/models');

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
    const comments  = await post.getComments()
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      content: post.content,
      creator: User.findById(post.userId),
      comments
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