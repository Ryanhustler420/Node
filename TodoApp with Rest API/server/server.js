var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/users');
var { Todo } = require('./models/todos');


var app = express();
//Middleware
app.use(bodyParser.json());

// CRUD METHOD

// post todos
app.post('/todos',(req,res) => {
  // console.log(req.body);
  var todo = new Todo({
    text:req.body.text
  })
  todo.save().then((doc) => {
    res.send(doc)
  },(e) => {
    res.status(400).send(e);
  })
});



app.listen(3000,() => {
  console.log("server running");
});

module.exports = {app};
