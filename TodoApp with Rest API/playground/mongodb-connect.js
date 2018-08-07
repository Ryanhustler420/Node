const MongoClient = require('mongodb').MongoClient;

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

  //Insert new doc into Users (name,age,location)
  db.collection('Users').insertOne({
    name:'Gaurav',
    age:20,
    location:"Cross Hospital 32 Street LA"
  },(err,result)=>{
    if(err) {
      return console.log('Unable to insert data into mongodb');
    }
    console.log('Successfully inserted one record');
    console.log(JSON.stringify(result.ops,undefined,2));
  })
  db.close();
});
