const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, 'We need an Id for exercise']
  },
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number
  },
  log: [{
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
  }]
}, {_id: false})

const Exercise = mongoose.model('Exercise', exerciseSchema)
module.exports = Exercise