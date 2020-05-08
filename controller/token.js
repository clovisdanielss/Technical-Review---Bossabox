const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      err.name = 'InvalidUsernameOrPassword'
      err.status = 401
      return next(err)
    } else if (user) {
      var token = jwt.sign(
        {
          username: user,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        process.env.SECRET)
      return res.json({ token: token })
    }
  })(req, res, next)
})

module.exports = router
