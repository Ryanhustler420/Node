const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoApp',(err,db) => {

  if(err){
    return console.log('Unable to connect to Mongodb server');
  }

  console.log('Connected Mongodb server');



  db.collection('Users').find().each((err,docs) =>{
  if(err){
    return console.log('Unable to fetch');
  }
    if(docs == null) {
        return;
    }else if(docs.name === "Gaurav"){
        console.log(docs);
    }
  });


});
