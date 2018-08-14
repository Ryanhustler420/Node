// this function is for client side

var socket = io();

socket.on('connect',function(){
  console.log('connected to server');

  //Sender
  socket.emit('createMessage',{from:"Gupta@exapmle.com",text:"watching porn! and actress is Sophia leone"});
});

//Receiver
socket.on('newMessage',function(emails){
  console.log('newMessage',emails);
});
