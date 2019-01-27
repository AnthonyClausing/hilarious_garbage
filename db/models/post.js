const Sequelize = require('sequelize');
const db = require('../db')

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING
  }
})

module.exports = Post;