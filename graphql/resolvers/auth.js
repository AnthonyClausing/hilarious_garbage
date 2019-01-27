const {User} = require('../../db/models')

module.exports = {
  users: async () => {
    return await User.findAll()
  }
}