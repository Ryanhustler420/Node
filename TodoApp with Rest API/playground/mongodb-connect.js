// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//ObjectID is a constructor to make ObjectId on the fly;

// var obj = new ObjectID();
// console.log(obj);

// //object destructuring
// var user = {name:"Gaurav",age:20}
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {
  if(err){
    return console.log('Unable to connect to Mongodb server');
  }
  console.log('Connected Mongodb server');

  // db.collection('todos').insertOne({
  //   text:'Something to do',
  //   completed: false
  // },(err,result) => {
  //   if(err){
  //     return console.log('Unable to insert todo');
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })

  Insert new doc into Users (name,age,location)
  db.collection('Users').insertOne({
    name:'Gaurav',
    age:20,
    location:"Cross Hospital 32 Street LA"
  },(err,result)=>{
    if(err) {
      return console.log('Unable to insert data into mongodb');
    }
    console.log('Successfully inserted one record');
    // console.log(JSON.stringify(result.ops,undefined,2));
    console.log(result.ops[0]._id.getTimestamp());
  })
  db.close();
});
