require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/users');
var { Todo } = require('./models/todos');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;
//Middleware
app.use(bodyParser.json());

// CRUD METHOD

process.on('unhandledRejection', (reason, promise) => {

  console.log('Unhandled Rejection at:==========================================');
  console.log(reason);
  console.log('Unhandled Rejection at:==========================================');
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
})


// post todos
app.post('/todos',authenticate,(req,res) => {
  var todo = new Todo({
    text:req.body.text,
    _creator:req.user._id
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.get('/todos',authenticate ,(req,res) => {
  Todo.find({
    _creator:req.user._id
  }).then((todos) => {
    res.send({
      todos
    });
  }).catch(e => {res.status(400).send(e);});
});

//fetching ID from url
// GET /todos/0123456789

app.get('/todos/:id',authenticate,(req,res) => {
    // res.send(req.params);
    var _id = req.params.id;
    // console.log(ObjectID.isValid(_id));
    // console.log(_id);
    if(!ObjectID.isValid(_id)){
      return res.status(404).send({});
    }

    Todo.findOne({
      _id:_id,
      _creator:req.user._id
    }).then((todo) => {
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

app.delete('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    // get the id
    if(!ObjectID.isValid(id)){
      //valid the id -> not valid ? return 404
      return res.status(404).send();
    }

    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo)=>{
    //success
    if(!todo){
      //if no doc, send 404
      return res.status(404).send({});
    }
    //if doc,send back with 200
    res.send({todo});
    //error
}).catch(e => {
    //400 with empty body
    res.status(404).send();
    });
});


app.patch('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','compeleted']);

  if(!ObjectID.isValid(id)){
    //valid the id -> not valid ? return 404
    return res.status(404).send();
  }

  if(_.isBoolean(body.compeleted) && body.compeleted){
    //true
    body.completedAt = new Date().getTime();
  }else{
    //false
    body.compeleted = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id : id,_creator:req.user._id },{$set:body},{new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(e => {
    res.status(400).send();
  })
});


// POST /users

app.post('/users',(req,res) =>{
  var body = _.pick(req.body,['email','password']);
  if(!Object.keys(body).length == 0){
    var user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    });
  }
});

app.get('/users/me',authenticate ,(req,res) => {
  res.send(req.user);
});



//POST /users/login {email,password}
app.post('/users/login',(req,res) => {
  var body = _.pick(req.body,['email','password']);
    User.findByCredentials(body.email,body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch(e => {
      res.status(404).send();
    })
});

app.delete('/users/me/token',authenticate,(req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  },() => {
    res.status(404).send();
  });
});

Promise.reject(new Error('Following Errors:'));

app.listen(port,() => {
  console.log(`Starting up at port ${port}`,'new service starts here');
});

// module.exports = {app}; uncommand for TTD
module.exports = {app};
