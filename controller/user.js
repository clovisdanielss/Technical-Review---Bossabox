var express = require('express')
var User = require('../models/user.js')
var router = express.Router()

router.get('/', (req, res, next) => {
  User.find({}, (err, arr) => {
    if (err) {
      next(err)
    } else {
      res.json(arr)
    }
  })
})

router.post('/', (req, res, next) => {
  var user = User(req.body)
  user.save((err, newUser) => {
    if (err) {
      next(err)
    } else {
      res.status(201).json(newUser)
    }
  })
})

module.exports = router
