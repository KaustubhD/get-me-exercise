const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

mongoose.Promise = global.Promise
mongoose.connect(process.env.URI)

const userSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: [true, 'Need a name at least bro!']
  }
})

const User = mongoose.model('User', userSchema)

const exerciseSchema = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: [true, 'We need an Id for exercise']
  },
  desc: {
    type: String,
    required: [true, 'Duh, there\'s no exercise']
  },
  duration: {
    type: Number,
    required: [true, 'How long do you do that for ?']
  },
  date: {
    type: Date,
    required: [true, 'BRUH! you fuckin stupid ? What\'s the date ?']
  }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)


let addUser = (req, res) => {
  
}


module.exports = {
  addUser
}