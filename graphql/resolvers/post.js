const {Post} = require('../../db/models')

module.exports = {
  
  posts: async () => {
    return await Post.findAll()
  },

  createPost: async (postData) => {
    try{
      const createdPost = await Post.create({
        title: postData.postInput.title, 
        description: postData.postInput.description, 
        content: postData.postInput.content
      })
      return createdPost
    } catch (err) {
      console.log(err)
    }
  }
}