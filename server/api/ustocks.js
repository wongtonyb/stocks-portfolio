const router = require('express').Router()
const {Op} = require('Sequelize')
const {Ustocks} = require('../db/models')
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
