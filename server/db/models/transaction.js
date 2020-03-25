const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
    // allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // allowNull: false
  },
  total: {
    type: Sequelize.DECIMAL(10, 2)
    // allowNull: false
  },
  date: {
    type: Sequelize.STRING
    // allowNull: false
  }
})

module.exports = Transaction
