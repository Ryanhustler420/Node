var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todos');


 var Todo = mongoose.model('todo', {
   text:{
     type:String
   },
   compeleted:{
     type:Boolean
   },
   completedAt:{
     type:Number
   }
 });


// var newTodo = new Todo({
//   text:"Cook dinner"
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo',doc);
// },(e) => {
//   console.log("unable to insert");
// })

//challange


var newTodo = new Todo({
  text:"make home work for school",
  compeleted:false,
  completedAt:120918
});

newTodo.save().then((doc) => {
  console.log('Saved todo',doc);
},(e) => {
  console.log("unable to insert");
})
