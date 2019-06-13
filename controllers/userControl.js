const User = require('../models/User')

let addUser = (req, res) => {
  User.findOne({name: req.body.username})
  .then(rec => {
    if(rec)
      res.json(rec)
    else{
      console.log('Rec not found, Making a new one')
      let userObj = new User({
        name: req.body.username
      })
      console.log('Adding object:', userObj)
      userObj.save()
        .then(prod => res.json(prod))
        .catch(err => console.error(err))
    }
  })
  .catch(err => console.error(err))
}


let getAllUsers = async (req, res) => {
  let bigJSON = await User.find({})
    .then(res => res)
    .catch(err => console.error(err))
  res.json(bigJSON)
}

module.exports = {addUser, getAllUsers}