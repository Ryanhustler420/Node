var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/users');
var { Todo } = require('./models/todos');


var app = express();
const port = process.env.PORT || 3000;
//Middleware
app.use(bodyParser.json());

// CRUD METHOD

process.on('unhandledRejection', (reason, promise) => {

  console.log('Unhandled Rejection at:=========================');
  console.log(reason);
  console.log('Unhandled Rejection at:=========================');
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})


// post todos
app.post('/todos',(req,res) => {
  var todo = new Todo({
    text:req.body.text
  })
  todo.save().then((doc) => {
    res.status(200).send(doc);
  },(e) => {
    res.status(400).send(e);
  }).catch(console.log);
});


app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  },(e) => {
    res.status(400).send(e);
  }).catch(console.log);
});

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

    Todo.findById(_id).then((todo) => {
      if(!todo){
        //if null send null body
        return res.status(404).send({});
      }
      // if success
      res.send({todo});
    }).catch(e => {
      res.status(400).send({})
    });
});

Promise.reject(new Error('Following Errors:'));

app.listen(port,() => {
  console.log(`Starting up at port ${port}`,'new service starts here');
});

// module.exports = {app};
