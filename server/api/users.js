const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//update cash
router.post('/cash', async (req, res, next) => {
  try {
    const user = await User.update(
      {
        cash: req.body.cash
      },
      {
        where: {
          id: req.body.userId
        }
      }
    )
    res.json(user)
  } catch (err) {
    next(err)
  }
})
