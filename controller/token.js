var jwt = require('jsonwebtoken')
var express = require('express')
var router = express.Router()

router.post('/', (req, res, next) => {
  if (req.body.username === process.env.NAME &&
   req.body.password === process.env.PASS) {
    var token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + 120 },
      process.env.SECRET)
    res.json({ token: token })
  } else {
    var err = new Error()
    err.name = 'InvalidUsernameOrPassword'
    err.status = 401
    return next(err)
  }
})

module.exports = router
