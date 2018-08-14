const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

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
  socket.emit('newMessage',{
    from:'Admin',
    text:'Gaurav welcomes you to this chat room!',
    createdAt: new Date().getTime()
  });

  //here user information is populating via user connection to server
  socket.on('informAll',(message)=>{
    socket.broadcast.emit('newMessage',{ //socket.broadcast.emit help use to broadcast message to all user except the coonected user
      information:message.userName + 'added as new user',
      createdAt: new Date().getTime()
    });
  });

  //called by client like socket.emit('createMessage',{from:"user",text:'watching tv'});
  socket.on('createMessage',(createdMessage) => {
    io.emit('newMessage',{
      from:createdMessage.from,
      text:createdMessage.text,
      createdAt:new Date().getTime()
    });

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
