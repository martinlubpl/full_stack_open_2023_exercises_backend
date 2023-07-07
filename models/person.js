const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const password = process.argv[2]
// const password = ''

// const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
// const url = `mongodb+srv://smdesigneu:${password}@cluster0.uhnkhqf.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((res) => {
    console.log('connected mongodb')
  })
  .catch((err) => {
    console.log('error ccc', err.message)
  })

const personSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: [true, 'Person phone required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{7,}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    minLength: 8,
  },
})

//copy _id to id, remove _id and __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
