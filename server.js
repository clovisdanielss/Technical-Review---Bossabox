var express = require('express')
var app = express()
var router = require('./controller/router')
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
app.mongoose = require('mongoose')
app.jwt = require('express-jwt')
app.PORT = process.env.PORT || 3000
dotenv.config()

// Defining middleware.
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Defining routes of my app.
router(app)

// Starting a connection with the db server. When started, the API server will start.
app.mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = app.mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(app.PORT, (err) => {
    if (err) {
      console.log('Problema ao lançar o servidor.')
    } else {
      console.log('Servidor escutando em', app.PORT)
    }
  })
})
