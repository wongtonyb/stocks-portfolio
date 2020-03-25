const Sequelize = require('sequelize')
const db = require('../db')

const Ustocks = db.define('ustocks', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Ustocks
