// this function is for client side
var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
});

socket.on('newMessage',function(emails){
  console.log('newMessage',emails);
});
