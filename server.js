const {
  addUser,
  getAllUsers,
  addExercise,
  getAllExes,
  getFilteredExes
} = require("./cool-file")
// server.js
// where your node app starts
var bodyParser = require('body-parser')

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
app.use(bodyParser.urlencoded({extended: false}))

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/api/exercise/new-user', (req, res) => {
  console.log(req.body)
  addUser(req, res)
})

app.get("/api/exercise/users", (req, res) => {
  getAllUsers(req, res)
})

app.post("/api/exercise/add", (req, res) => {
  console.log(req.body)
  addExercise(req, res)
})

app.get("/api/exercise/log/:id", (req, res) => {
  // console.log(req.query)
  // if(req.query == {})
    getAllExes(req, res)
  // else
  //   getFilteredExes(req, res)
})

// app.get("/api/exercise/log/:id", (req, res) => {
//   getAllExes(req, res)
// })


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
