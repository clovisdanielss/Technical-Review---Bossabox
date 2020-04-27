var express = require('express')
var router = express.Router()
var Tool = require('../models/tool.js')

router.get('/', (req, res) => {
  if (req.query === undefined) {
    req.query = {}
  }
  Tool.find(req.query, (err, arr) => {
    if (err) {
      res.status(500)
      res.json({ Error: 'Erro na operação de retornar todos elementos.' })
    }
    res.json(arr)
  })
})

router.post('/', (req, res) => {
  var tool = Tool(req.body)
  tool.save((err, newTool) => {
    if (err) {
      res.status(500)
      res.json({ Error: 'Erro ocorreu na hora de inserir elemento na base de dados.' })
    } else {
      res.status(201)
      res.json(newTool)
    }
  })
})

router.delete('/:id', (req, res) => {
  Tool.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      res.status(500)
      res.json({ Error: 'Houve erro na remoção do elemento', id: req.params.id })
    } else {
      res.status(204)
      res.json({ Sucess: 'Elemento removido com sucesso', id: req.params.id })
    }
  })
})
module.exports = router
