const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/hg_dev',{
    logging: false,
    dialect: 'postgres'
  }
)

module.exports = db