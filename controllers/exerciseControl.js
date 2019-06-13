const Exercise = require('../models/Exercise')
const User = require('../models/User')

const ObjectId = require('mongoose').Types.ObjectId

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
module.exports = {addExercise, getAllExes}