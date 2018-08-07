const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {

  if(err){
    return console.log('Unable to connect to Mongodb server');
  }

  console.log('Connected Mongodb server');

//============
  // dont run this file at once
  // run one function at a time
  // else you wont see single opration
//============

  //deleteMany
  db.collection('todos').deleteMany({text:"Eat lunch"})
  .then(res => console.log);


  //deleteOne
  db.collection('todos').deleteOne({text:"Eat lunch"})
  .then(console.log);


  //findOneAndDelete
  db.collection('todos').findOneAndDelete({completed:false}).then(console.log);

  //challange
  //deleteMany

  db.collection('Users').deleteMany({name:'Gaurav'}).then(console.log);

  //findOneAndDelete with _id

  db.collection('Users').findOneAndDelete({
    _id:new ObjectID('5b69d817ef9d0b48b815875c')
  }).then(console.log);

  //db.close

});
