const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {

  if(err){
    return console.log('Unable to connect to Mongodb server');
  }

  console.log('Connected Mongodb server');

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectID("5b69db99c874484b1c291dcc")
  },{
    $set:{
      name:"Gaurav",
    },
    $inc:{
      age: 1
    }
  },{
    returnOriginal: false
  }).then(console.log);

  //db.close
});
