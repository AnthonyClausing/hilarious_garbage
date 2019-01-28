const {Post, User} = require('../../db/models')

module.exports = {
  users: async () => {
    const foundUsers = await User.findAll()
    return foundUsers.map(user =>{
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: null,
        createdPosts: Post.findAll({where:  {userId: user.id}}) 
      }
    })
  }
}