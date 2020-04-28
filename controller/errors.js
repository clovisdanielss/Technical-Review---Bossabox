function logError (err, req, res, next) {
  console.error('Novo erro:', err)
  next(err)
}
function errorHandler (err, req, res, next) {
  if (!err.status) {
    err.status = 500
  }
  res.status(err.status).json({ error: err.name })
}

module.exports = { errorHandler, logError }
