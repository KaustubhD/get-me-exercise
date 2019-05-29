const User = require('./User')
const Ex = require('./Exercise')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = {User, Ex}