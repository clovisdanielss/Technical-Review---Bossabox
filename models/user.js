const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy

var userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

userSchema.statics.localStrategy = new LocalStrategy((username, password, done) => {
  // Como as senhas não estão seguras por criptografia, essa busca resolve.
  mongoose.model('User').findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err, null)
    } else if (user.validatePassword(password)) {
      return done(null, user)
    } else {
      return done({}, false)
    }
  })
})

userSchema.statics.serialize = function (user, done) {
  done(null, user._id)
}

userSchema.statics.deserialize = function (_id, done) {
  mongoose.model('User').findById(_id, function (err, user) {
    done(err, user)
  })
}

userSchema.methods.validatePassword = function (password) {
  // Não existe encriptação nessa aplicação
  if (this.password === password) {
    return true
  }
  return false
}

module.exports = mongoose.model('User', userSchema)
