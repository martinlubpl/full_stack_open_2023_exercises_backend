const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//index
app.get("/", (req, res) => {
  res.send("REST API");
});
//all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
//info
app.get("/info", (req, res) => {
  let html = `Phonebook has info for ${persons.length} people<br/>`;
  html += new Date();
  res.send(html);
});

//single entry
app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  console.log(personId);
  const person = persons.find((per) => per.id === personId);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("404 wrong id"); //
  }
});

//delete entry by id
app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  persons = persons.filter((person) => person.id !== personId);
  res.status(204).send("just deleted");
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
