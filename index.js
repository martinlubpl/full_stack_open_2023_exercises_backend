require('dotenv').config() // import .env first
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// morgan("tiny");
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan('tiny'))

//const
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const Person = require('./models/person')

//index
app.get('/', (req, res) => {
  res.send('REST API')
})
//all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})
//info
app.get('/info', (req, res) => {
  let html = `Phonebook has info for ${persons.length} people<br/>`
  html += new Date()
  res.send(html)
})

//single entry
app.get('/api/persons/:id', (req, res) => {
  // const personId = Number(req.params.id)
  // console.log(personId)
  // const person = persons.find((per) => per.id === personId)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(404).send('404 wrong id') //
  // }

  //no need to change to number anymore
  Person.findById(req.params.id).then((returnedPerson) => {
    res.json(returnedPerson)
  })
})

//delete entry by id
app.delete('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id)
  persons = persons.filter((person) => person.id !== personId)
  res.status(204).send('just deleted')
})

//add entry
// use express json moved
const getNewId = () => {
  // const maxId =
  //   persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  // return maxId + 1;

  return Math.floor(Math.random() * 1000000)
}
app.post('/api/persons/', (req, res) => {
  const newPerson = req.body
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  //check if person exits
  // if (persons.some((person) => person.name === newPerson.name)) {
  //   return res.status(400).json({ error: 'name must be unique' })
  // }

  // const person = {
  //   id: getNewId(),
  //   name: req.body.name,
  //   number: req.body.number,
  // }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  console.log(person)
  // persons = persons.concat(person)
  person.save().then((savedPerson) => {
    res.json(savedPerson)
  })

  // console.log(persons);
  // res.json(person)
})

//update entry

//
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
