const router = require('express').Router()
const {Op} = require('sequelize')
const {Ustocks, User} = require('../db/models')
module.exports = router

//get
//by user :id
router.get('/:id', async (req, res, next) => {
  try {
    const portfolio = await Ustocks.findAll({
      where: {
        userId: req.params.id,
        qty: {
          [Op.gt]: 0
        }
      },
      order: [['id', 'ASC']]
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

//by userId stocksymbol
router.get('/:id/:symbol', async (req, res, next) => {
  try {
    const ustock = await Ustocks.findOne({
      where: {
        userId: req.params.id,
        symbol: req.params.symbol
      }
    })
    res.json(ustock)
  } catch (err) {
    next(err)
  }
})

//post
//edit qty on sell
router.post('/sell', async (req, res, next) => {
  try {
    const ustock = await Ustocks.update(
      {
        qty: req.body.qty
      },
      {
        where: {
          symbol: req.body.symbol,
          companyName: req.body.companyName,
          userId: req.body.userId
        }
      }
    )
    const userid = req.body.userId
    res.json(userid)
  } catch (err) {
    next(err)
  }
})

//edit qty on buy
router.post('/buy', async (req, res, next) => {
  try {
    const ustock = await Ustocks.findOrCreate({
      where: {
        userId: req.body.userId,
        companyName: req.body.companyName,
        symbol: req.body.symbol
      }
    })

    const rv = await ustock[0].update({
      qty: ustock[0].qty + req.body.qty
    })
    res.json(rv)
  } catch (err) {
    next(err)
  }
})
