var mongoose = require('mongoose');

var Todo = mongoose.model('todo', {
  text:{
    type:String,
    required: true,
    minlength: 1,
    trim:true
  },
  compeleted:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

module.exports = { Todo };

// var newTodo = new Todo({
//  text:" Edit this video  "
// });
//
// newTodo.save().then((doc) => {
//  console.log('Saved todo',doc);
// },(e) => {
//  console.log("unable to insert");
// })
