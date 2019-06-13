const {addExercise, getAllExes} = require('./exerciseControl')
const {addUser, getAllUsers} = require('./userControl')

module.exports = {
  addUser,
  addExercise,
  getAllUsers,
  getAllExes
}