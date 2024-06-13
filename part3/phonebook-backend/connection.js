const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', true)

module.exports = function () {
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
}
