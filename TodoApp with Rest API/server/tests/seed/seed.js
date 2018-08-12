const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todos');
const {User} = require('../../models/users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email:'gaurav@express.com',
  password:'userOnePass',
  token:[{
      access:'auth',
      token: jwt.sign({_id:userOneId,access:'auth'},'abc123').toString()
    }]
},{
  _id: userTwoId,
  email: 'jan@gmail.com',
  password:'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text:"first test to do"
},{
  _id: new ObjectID(),
  text:"Second test to do",
  compeleted:true,
  completedAt:333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var UserOne = new User(users[0]).save();
    var UserTwo = new User(users[1]).save();
    return Promise.all([UserOne,UserTwo]);
  }).then(() => done());
};

module.exports = {todos,populateTodos,populateUsers,users};
