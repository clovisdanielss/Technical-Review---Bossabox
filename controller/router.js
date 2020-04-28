var tools = require('./tools.js')
var token = require('./token.js')
var errors = require('./errors.js')

const router = (app) => {
  app.use(app.jwt({
    secret: 'secret',
    getToken: (req) => {
      if (req.headers && req.headers.authorization) {
        return req.headers.authorization
      } else {
        return null
      }
    }
  }).unless({ path: ['/token/'] }))
  app.use('/token', token)
  app.use('/tools', tools)
  app.use(errors.logError)
  app.use(errors.errorHandler)
}

module.exports = router
