const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://smdesigneu:${password}@cluster0.uhnkhqf.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// note.save().then((result) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// console.log(process.argv)
// mongoose.connection.close()

if (process.argv.length > 3) {
  //add
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  //find
  Person.find({}).then((res) => {
    console.log('phonebook: ')
    res.forEach((pers) => {
      console.log(`${pers.name} ${pers.number}`)
    })
    mongoose.connection.close()
  })
}
