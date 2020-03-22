const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

//get transaction

//add transaction
router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body)
    res.json(transaction)
  } catch (err) {
    next(err)
  }
})
