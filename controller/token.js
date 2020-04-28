var jwt = require('jsonwebtoken')
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  var token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + 120 }, process.env.SECRET)
  res.json({ token: token })
})

module.exports = router
