'use strict'

const db = require('../server/db')
const {User, Transaction, Ustocks} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'test',
      email: 'test@email.com',
      password: 'test',
      cash: 5000
    })
  ])

  const transaction = await Promise.all([
    Transaction.create({
      symbol: 'AAPL',
      companyName: 'Apple, Inc.',
      type: 'buy',
      price: 237.85,
      qty: 5,
      total: 1189.25,
      date: '2020-2-22 23:37:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'AAPL',
      companyName: 'Apple, Inc.',
      type: 'buy',
      price: 227.85,
      qty: 2,
      total: 455.7,
      date: '2020-2-23 23:37:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'AAPL',
      companyName: 'Apple, Inc.',
      type: 'sell',
      price: 257.85,
      qty: 3,
      total: 773.55,
      date: '2020-2-23 23:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      type: 'buy',
      price: 439.05,
      qty: 3,
      total: 1317.15,
      date: '2020-2-24 23:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      type: 'sell',
      price: 469.05,
      qty: 3,
      total: 1407.15,
      date: '2020-2-25 23:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'SNAP',
      companyName: 'Snap, Inc.',
      type: 'buy',
      price: 10.27,
      qty: 21,
      total: 215.67,
      date: '2020-2-26 18:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'TWTR',
      companyName: 'Twitter, Inc.',
      type: 'buy',
      price: 24.23,
      qty: 11,
      total: 266.53,
      date: '2020-3-12 22:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'FB',
      companyName: 'Facebook, Inc.',
      type: 'buy',
      price: 155.19,
      qty: 3,
      total: 465.57,
      date: '2020-3-13 23:45:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'NFLX',
      companyName: 'Netflix, Inc.',
      type: 'buy',
      price: 337.79,
      qty: 5,
      total: 1688.95,
      date: '2020-3-14 23:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'TWTR',
      companyName: 'Twitter, Inc.',
      type: 'sell',
      price: 26.23,
      qty: 5,
      total: 131.15,
      date: '2020-3-15 18:39:25',
      userId: 1
    }),
    Transaction.create({
      symbol: 'SNAP',
      companyName: 'Snap, Inc.',
      type: 'sell',
      price: 11.23,
      qty: 4,
      total: 44.92,
      date: '2020-3-15 22:49:13',
      userId: 1
    }),
    Transaction.create({
      symbol: 'MSFT',
      companyName: 'Microsoft Corp.',
      type: 'buy',
      price: 147.75,
      qty: 5,
      total: 738.75,
      date: '2020-3-19 19:19:25',
      userId: 1
    })
  ])

  const ustocks = await Promise.all([
    Ustocks.create({
      symbol: 'AAPL',
      companyName: 'Apple, Inc.',
      qty: 4,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'TSLA',
      companyName: 'Tesla, Inc.',
      qty: 0,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'SNAP',
      companyName: 'Snap, Inc.',
      qty: 17,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'TWTR',
      companyName: 'Twitter, Inc.',
      qty: 6,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'FB',
      companyName: 'Facebook, Inc.',
      qty: 3,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'NFLX',
      companyName: 'Netflix, Inc.',
      qty: 5,
      userId: 1
    }),
    Ustocks.create({
      symbol: 'MSFT',
      companyName: 'Microsoft Corp.',
      qty: 5,
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
