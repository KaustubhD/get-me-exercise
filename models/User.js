const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Need a name at least bro!']
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User