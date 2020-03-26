const router = require('express').Router()
const {Op} = require('sequelize')
const {Transaction, User} = require('../db/models')
module.exports = router

//get transaction
// all - for testing
// router.get('/', async (req, res, next) => {
//   try {
//     const trans = await Transaction.findAll({
//       where: {
//         userId: req.user.id,
//         qty: {
//           [Op.gt]: 0
//         }
//       }
//     })
//     res.json(trans)
//   } catch (err) {
//     next(err)
//   }
// })

//GET
//by id
router.get('/:id', async (req, res, next) => {
  try {
    const trans = await Transaction.findAll({
      where: {
        userId: req.params.id,
        qty: {
          [Op.gt]: 0
        }
      },
      order: [['date', 'DESC']]
    })
    res.json(trans)
  } catch (err) {
    next(err)
  }
})

//PUT
//add transaction
router.put('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body)
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
