var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

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


app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  },(e) => {
    res.status(400).send(e);
  });
})

//fetching ID from url
// GET /todos/0123456789

app.get('/todos/:id',(req,res) => {
    // res.send(req.params);
    var _id = req.params.id;
    // console.log(ObjectID.isValid(_id));
    // console.log(_id);
    if(!ObjectID.isValid(_id)){
      return res.status(404).send({});
    }
    //validate id isValid
    //404 - sand with empty body

    Todo.findById(_id).then((todo) => {
      console.log('reached');
      if(!todo){
        //if null send null body
        return res.status(404).send({});
      }
      // if success
      res.send({todo});
    }).catch(e => {
      res.status(400).send({})
    });

    //findById
      //sucess case
        //if todo send back
        // if not todo  send- back 404 with empty body
      //error =
        // 400 status [send nothing back]

});

app.listen(3000,() => {
  console.log("server running");
});

module.exports = {app};
