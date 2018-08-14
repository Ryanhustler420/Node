const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('new user connected!');
  //this function will called by all user who connect with the server and they have to
  // impliment this as socket.on('userConnected',function(mess)=>{console.log(mess);}) => to get message greeting
  socket.emit('newMessage',generateMessage('admin','welcome to chat app'));

  //here user information is populating via user connection to server
  socket.on('informAll',(message)=>{
    socket.broadcast.emit('newMessage',generateMessage(message.userName,'is now joined'));
  });

  //called by client like socket.emit('createMessage',{from:"user",text:'watching tv'});
  socket.on('createMessage',(createdMessage,callback) => {
    io.emit('newMessage',generateMessage(createdMessage.from,createdMessage.text));
    callback('this is from the server');
    // broadcast => with broadcast we can send data to all user but we cant
    // see the message back object this is very helpful when we connected to
    // the app where all users will know that "SomeUserName" connect and we will
    // see "welcone SomeUserName" as toast.
    // socket.broadcast.emit('newMessage',{
    //     from:createdMessage.from,
    //     text:createdMessage.text,
    //     createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
