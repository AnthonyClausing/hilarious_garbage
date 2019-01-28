const {Post, User, Comment} = require('../../db/models');

module.exports = {
  
  posts: async () => {
    const posts = await Post.findAll()
    const comm = await Comment.findAll()
    
    return await posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        creator: User.findById(post.userId),
        comments: comm.filter( c => c.postId === post.id) ,
        createdAt: post.createdAt
      }
    })
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