var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email:{
    type:String,
    trim:true,
    required:true,
    minlength:1
  }
});

module.exports = { User };

// var anUser = new User({
//   email:"Gauravgupta983@gmail.com"
// });
//
//
// anUser.save().then((res) => {
//   console.log("inserted one record");
// },(e) => {
//   console.log('Unable to insert to databse');
// });
