const Sequelize = require('sequelize');
const db = require('../db')

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  }
})

module.exports = Post;