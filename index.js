const express = require("express");
const app = express();

const persons = [
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

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);