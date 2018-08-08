const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

// var id = '5b6aa0484148b534204c6d17121';
// var id = '6b6aa0484148b534204c6d17';

// if(!ObjectID.isValid(id)){
//   console.log("ID not valid");
// }else{
//
// }

// Todo.find({
//   _id:id
// }).then((todos) => {
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id:id
// }).then((todo) => {
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('id not found');
//   }
//     console.log('Todo by id',todo);
// }).catch(console.log);

// user not found
// id wrong
// findbyid

var id = "5b69fd5e5601341b64a389cb";
// var id = "5b69fd5e5601341b64a389cb41212"; //Cast to ObjectId failed fro value..
User.findById(id).then(user => {
  if(!user){
    console.log("unable to find user")
  }else{
    console.log(JSON.stringify(user,undefined,2));
  }
}).catch(console.log);
