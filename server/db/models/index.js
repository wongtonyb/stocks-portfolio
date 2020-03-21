const User = require('./user')
const Transaction = require('./transaction')
const Ustocks = require('./ustocks')

/**
 * Associations
 */

// One-Many User-Transaction
User.hasMany(Transaction)
Transaction.belongsTo(User)

// One-Many User-Ustocks
User.hasMany(Ustocks)
Ustocks.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Transaction,
  Ustocks
}
