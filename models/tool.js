var mongoose = require('mongoose')

var toolSchema = new mongoose.Schema({
  id: 'number',
  title: String,
  link: String,
  description: String,
  tags: 'array'
})

module.exports = mongoose.model('Tool', toolSchema)
