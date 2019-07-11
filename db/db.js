const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DATABASE_URL || 'hg_dev', 'postgres', 'coderboy', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  }
)

module.exports = db