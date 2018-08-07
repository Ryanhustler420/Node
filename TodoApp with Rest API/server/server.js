var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todos');


//  var Todo = mongoose.model('todo', {
//    text:{
//      type:String,
//      required: true,
//      minlength: 1,
//      trim:true
//    },
//    compeleted:{
//      type:Boolean,
//      default:false
//    },
//    completedAt:{
//      type:Number,
//      default:null
//    }
//  });
//
//
// var newTodo = new Todo({
//   text:" Edit this video  "
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo',doc);
// },(e) => {
//   console.log("unable to insert");
// })

//challange

//make users schema
//email -require it - trim it - set type - set min length of 1

var User = mongoose.model('User',{
  email:{
    type:String,
    trim:true,
    required:true,
    minlength:1
  }
});


var anUser = new User({
  email:"Gauravgupta983@gmail.com"
});


anUser.save().then((res) => {
  console.log("inserted one record");
},(e) => {
  console.log('Unable to insert to databse');
});
