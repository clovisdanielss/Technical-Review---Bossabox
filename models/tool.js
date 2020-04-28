var mongoose = require('mongoose')

var toolSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  link: String,
  description: String,
  tags: 'array'
})

module.exports = mongoose.model('Tool', toolSchema)
