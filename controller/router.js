const tools = require('./tools.js')
const token = require('./token.js')
const errors = require('./errors.js')
const user = require('./user.js')
const passport = require('passport')
const User = require('../models/user.js')

const router = (app) => {
  app.use(passport.initialize())
  passport.use(User.localStrategy)

  app.use(app.jwt({
    secret: (req, payload, done) => {
      done(null, process.env.SECRET)
    },
    getToken: (req) => {
      if (req.headers && req.headers.authorization) {
        return req.headers.authorization
      } else {
        return null
      }
    }
  }).unless({ path: ['/token/', '/user/'] }))
  app.use('/user', user)
  app.use('/token', token)
  app.use('/tools', tools)
  app.use(errors.logError)
  app.use(errors.errorHandler)
}

module.exports = router
