// this function is for client side
var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('informAll',{userName:'Gaurav'});
});

//this function is as generic function and will be called as soon as user connected with server
// and trigger the server emitters.
socket.on('newMessage',function(emails){
  console.log('newMessage',emails);
});

socket.emit('createMessage',{
  from:'Frank',
  text:'Hi\''
},function(){
  console.log('got it');
});
