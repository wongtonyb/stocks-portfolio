const router = require('express').Router()
const {Op} = require('Sequelize')
const {Ustocks, User} = require('../db/models')
module.exports = router

//get
//buy :id
router.get('/:id', async (req, res, next) => {
  try {
    const portfolio = await Ustocks.findAll({
      where: {
        userId: req.params.id,
        qty: {
          [Op.gt]: 0
        }
      }
    })
    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

//post
//edit qty
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
