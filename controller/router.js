var tools = require('./tools.js')

const router = (app) => {
  app.use('/tools', tools)
}

module.exports = router
