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

  //called by client like socket.emit('createMessage',{from:"user",text:'watching tv'});
  socket.on('createMessage',(createdMessage) => {
    io.emit('newMessage',{
      from:createdMessage.from,
      text:createdMessage.text,
      createdAt:new Date().getTime()
    });
  });

  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
