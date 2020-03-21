const Sequelize = require('sequelize')
const db = require('../db')

const Ustocks = db.define('ustocks', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Ustocks
