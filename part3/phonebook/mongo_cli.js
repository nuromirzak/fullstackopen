const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo_cli.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@fullstackopen-cluster.1yzldgq.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name,
    number,
  })

  person
    .save()
    .then((result) => {
      console.log('User successfully added to phonebook', result)
      mongoose.connection.close()
    })
    .catch((err) => {
      console.log('Error adding person:', err.message)
      process.exit(1)
    })
} else {
  Person.find({})
    .then((result) => {
      console.log('Phonebook:')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((err) => {
      console.log('Error fetching persons:', err.message)
      process.exit(1)
    })
}
