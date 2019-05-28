const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

mongoose.Promise = global.Promise
mongoose.connect(process.env.URI, {useNewUrlParser: true})

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Need a name at least bro!']
  }
})

const User = mongoose.model('User', userSchema)

const exerciseSchema = new Schema({
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


let addUser = (req, res) => {
  let userObj = new User({
    name: req.body.username
  })
  userObj.save()
    .then(prod => res.json(prod))
    .catch(err => console.error(err))
}


let getAllUsers = async (req, res) => {
  let bigJSON = await User.find({})
    .then(res => res)
    .catch(err => console.error(err))
  res.json(bigJSON)
}


let addExercise = async (req, res) => {
  let name = ''
  let count = 0
  
  
  
  await User.findOne({_id: ObjectId(req.body['user-id'])})
  .then(rec => {
    name = rec.name
  }).catch(err => console.error(err))
  
  
  await Exercise.findOne({_id: req.body['user-id']})
  .then(rec => {
    if(rec)
      count = rec.log.length
    console.log(rec)
  }).catch(err => console.error(err))
  
  
  let UpdateObj = {
    desc: req.body["exercise"],
    duration: req.body["duration"],
    date: req.body["date"]
  }
  
  if(count){
    Exercise.findOneAndUpdate(
      {_id: req.body['user-id']}, // query
      {$push: {log: UpdateObj}, $inc: {count: 1}},  // change
      {useFindAndModify: false, new: true})  // flags
    .then(data => res.json(data))
    .catch(err => console.error(err))
  }
  else{
    let exObj = new Exercise({
      _id: req.body["user-id"],
      username: name,
      count: 1,
      log: [UpdateObj]
    })

    exObj
      .save()
      .then(rec => res.json(rec))
      .catch(err => console.error(err))
  }
  
}


let getAllExes = async (req, res) => {
  let obj = await Exercise.findOne({ _id: req.params.id })
    .then(rec => rec)
    .catch(err => console.error(err))
  
  console.log('Rec is', obj)
  if(req.query){
    if(req.query.from)
      obj.log = obj.log.filter(rec => new Date(rec.date) > new Date(req.query.from))
    if(req.query.to)
      obj.log = obj.log.filter(rec => new Date(rec.date) > new Date(req.query.to))
    if(req.query.duration)
      obj.log = obj.log.filter(rec => rec.duration == req.query.duration)
  }
  res.json(obj)
}


let getFilteredExes = async (req, res) => {
  let q = {_id: req.params.id}
  if(req.query.from){
    q.date = {$gte: req.query.from}
  }
  if(req.query.to){
    q.date = {$lt: req.query.to}
  }
  if(req.query.duration){
    q.duration = {$eq: req.query.duration}
  }
  Exercise.find(q)
    .exec()
    .then(rec => console.log())
}

module.exports = {
  addUser,
  addExercise,
  getAllUsers,
  getAllExes,
  getFilteredExes
}