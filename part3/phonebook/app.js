const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const middlewares = require('./utils/middlewares')
const Person = require('./models/person')
require('./mongo_connection')

require('express-async-errors')
const personsController = require('./controllers/personsController')

morgan.token('body', (req, _res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app .use(express.static('build'))

app.use('/api/persons', personsController)

app.get('/info', async (req, res) => {
  const persons = await Person.find({})

  let toSend = `<p>Phonebook has info for ${persons.length} people</p>`
  toSend += `<p>${new Date()}</p>`
  res.send(toSend)
})

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app
